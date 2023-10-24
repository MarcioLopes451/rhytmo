"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

export default function Navbar() {
  const [token, setToken] = useState("");
  const [albums, setAlbums] = useState([]);

  const CLIENT_ID = "eb3e79d2df62424894b6d908f86fadd1";
  const REDIRECT_URI = "http://localhost:3000/";
  const auth = "https://accounts.spotify.com/authorize";
  const res = "token";

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const newReleases = {
    Authorization: `Bearer ${token}`,
  };
  const newReleasesUrl = "https://api.spotify.com/v1/browse/new-releases";

  axios
    .get(newReleasesUrl, { headers: newReleases })
    .then((newReleasesResponse) => {
      const newReleasesData = newReleasesResponse.data;

      // Extract the album data from the API response
      const albums = newReleasesData.albums.items;

      setAlbums(albums);
    })
    .catch((error) => {
      console.error("Error fetching new releases:", error);
    }, []);

  const renderAlbums = () => {
    return (
      <div className="w-[6000px] overflow-hidden">
        <div className="flex mt-2 animate-scrollRightToLeft">
          {albums.map((album) => (
            <div key={album.id} className="w-[300px] h-[300px] relative">
              <Image
                src={album.images[0].url}
                alt="img"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-10">
      <div>
        {!token ? (
          <div className="flex justify-end items-center gap-16 px-8 pt-2">
            <h1 className="font-semibold">RYHTMO</h1>
            <a
              href={`${auth}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${res}`}
            >
              <button className="bg-blue w-16 rounded-md text-base">
                login
              </button>
            </a>
          </div>
        ) : (
          <div>
            <div className="flex justify-end items-center gap-16 px-8 pt-2">
              <h1 className="font-semibold">RYHTMO</h1>
              <button
                onClick={logout}
                className="bg-blue w-16 rounded-md text-base"
              >
                logout
              </button>
            </div>
            <div>{renderAlbums()}</div>
          </div>
        )}
      </div>
    </div>
  );
}
