import React from "react";
import close from "@/public/211651_close_round_icon.png";
import Image from "next/image";

export default function MobileNav({ isOpen, onClose }) {
  return isOpen ? (
    <div className="bg-[#2C2C2C] absolute z-[30] left-[220px] -top-2 w-[200px] h-full">
      <Image
        src={close}
        alt="close btn"
        width={30}
        height={30}
        className="absolute left-[100px] top-4"
        onClick={onClose}
      />
    </div>
  ) : null;
}
