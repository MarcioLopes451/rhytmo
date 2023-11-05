"use client";
import { useState, useEffect } from "react";
import burger from "@/public/2203512_burger_menu_more_panel_icon.png";
import Image from "next/image";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [token, setToken] = useState("");
  const [state, setState] = useState(false);

  function handleClick() {
    setState(!state);
  }

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

  return (
    <div className="w-full h-full">
      {!token ? (
        <div className="flex justify-center items-center flex-col gap-10 mt-[388px]">
          <h1 className="font-semibold">RYHTMO</h1>
          <a
            href={`${auth}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${res}`}
          >
            <button className="bg-blue rounded-md text-base px-3">
              Login via spotify
            </button>
          </a>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center gap-16 px-7 py-2 mt-2">
            <h1 className="font-bold text-[20px]">RYHTMO</h1>
            <Image
              src={burger}
              alt="burger menu"
              width={30}
              height={30}
              onClick={handleClick}
            />
          </div>
        </div>
      )}
      {state && <MobileNav isOpen={state} onClose={handleClick} />}
    </div>
  );
}
