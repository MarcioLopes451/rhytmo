import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function Artists() {
  const [artists, setArtists] = useState([]);
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

  const tokens = {
    Authorization: `Bearer ${token}`,
  };
  const artistUrl = "https://api.spotify.com/v1/me/following?type=artist";

  axios
    .get(artistUrl, { headers: tokens })
    .then((Response) => {
      const artistData = Response.data;
      const artistId = artistData.artists.items;
      setArtists(artistId);
    })
    .catch((error) => {
      console.error("Error fetching artists:", error);
    }, []);

  return (
    <div className="mt-5">
      <div className="flex flex-col justify-normal items-center gap-5">
        {artists.map((artist) => (
          <div key={artist.id}>
            <p className="text-white">{artist.name}</p>
            <Image src={artist.images[0].url} alt="artist" />
          </div>
        ))}
      </div>
    </div>
  );
}
