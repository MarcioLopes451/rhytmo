import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Album() {
  const [search, setSearch] = useState("");
  const [albums, setAlbums] = useState([]);
  const [token, setToken] = useState("");

  const searchAlbums = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: search,
        type: "album",
      },
    });
    setAlbums(data.albums.items);
  };

  const renderAlbums = () => {
    return albums.map((album) => (
      <div key={album.id}>
        {album.images.length ? (
          <Image src={album.images[0].url} alt="img" />
        ) : (
          <div>no</div>
        )}
        <p>{album.name}</p>
      </div>
    ));
  };
  return (
    <div>
      <div className="">
        <form onSubmit={searchAlbums}>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="text-black"
          />
          <button type={"submit"}>Search</button>
        </form>
        {renderAlbums()}
      </div>
    </div>
  );
}
