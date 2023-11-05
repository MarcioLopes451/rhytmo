"use client";
import Album from "@/components/album/Album";
import Artists from "@/components/artists/Artists";
import Navbar from "@/components/navbar/Navbar";
import { useState, useEffect } from "react";

export default function Home() {
  
  return (
    <div className="text-white relative">
      <Navbar />
      <Album />
      <Artists />
    </div>
  );
}
