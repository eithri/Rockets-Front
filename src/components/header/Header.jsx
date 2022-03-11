import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";

export default function Header() {
  return (
    <div className="flex justify-end background p-5 text-white">
      <div className="flex justify-evenly text-center px-20 items-center w-3/5 text-xl">
        <h1 className="flex-1 ">INICIO</h1>
        <h1 className="flex-1 ">CONÓCENOS</h1>
        <img
          className="w-24"
          src="https://i.ibb.co/M1MbSvC/ROCKETS-LOGO.png"
          alt="logo Rockets Athman"
        />
        <h1 className="flex-1 ">LOGROS</h1>
        <h1 className="flex-1 ">CONTACTENOS</h1>
      </div>
      <div className="flex justify-center text-center items-center px-10 w-1/5">
        <a className="flex-1" href="https://vm.tiktok.com/ZMRrMJHLw/">
          <FontAwesomeIcon icon={["fab", "tiktok"]} size="2x" />
        </a>
        <a className="flex-1" href="https://www.facebook.com/Rocketsss">
          <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
        </a>
        <a
          className="flex-1"
          href="https://www.instagram.com/roockets_duitama/?hl=es"
        >
          <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
        </a>
      </div>
    </div>
  );
}
