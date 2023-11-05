"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function Album() {
  const [albums, setAlbums] = useState([]);
  const [token, setToken] = useState("");

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

  const newReleases = {
    Authorization: `Bearer ${token}`,
  };
  const newReleasesUrl = "https://api.spotify.com/v1/browse/new-releases";

  axios
    .get(newReleasesUrl, { headers: newReleases })
    .then((newReleasesResponse) => {
      const newReleasesData = newReleasesResponse.data;
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
  return <div>{renderAlbums()}</div>;
}
