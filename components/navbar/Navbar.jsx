"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

export default function Navbar() {
  const [token, setToken] = useState("");
  const [albums, setAlbums] = useState([]);

  const CLIENT_ID = "eb3e79d2df62424894b6d908f86fadd1";
  const CLIENT_SECRET = "0ae1d1c5ebed48aa83c363f20f46259a";
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

  const base = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

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
    return albums.map((album) => (
      <div key={album.id} className="mt-2">
        <div className="flex flex-row justify-center flex-nowrap">
          <Image src={album.images[0].url} alt="img" width={375} height={300} />
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full h-10">
      <div className="flex justify-end items-center px-8 pt-2 gap-16">
        <h1 className="font-semibold">RYHTMO</h1>
        <div>
          {!token ? (
            <a
              href={`${auth}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${res}`}
            >
              <button className="bg-blue w-16 rounded-md text-base">
                login
              </button>
            </a>
          ) : (
            <button
              onClick={logout}
              className="bg-blue w-16 rounded-md text-base"
            >
              logout
            </button>
          )}
        </div>
      </div>

      <div>{renderAlbums()}</div>
    </div>
  );
}
