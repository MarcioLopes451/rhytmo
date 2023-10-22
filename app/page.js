"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [token, setToken] = useState("");

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
        .find((elem) => elem.startsWith("access_token"))?.split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div>
      {!token ? (
        <a
          href={`${auth}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${res}`} className="text-blue"
        >
          login
        </a>
      ) : (
       <button onClick={logout}>logout</button>
      )}
    </div>
  );
}
