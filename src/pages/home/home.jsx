import React from "react";
import Header from "../../components/header";
import Carrousel from "../../components/carrousel";
import AwardCard from "../../components/AwardCard";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex bg-gray flex-wrap">
        <section className="w-1/2 p-12">
          <h3 className="text-gray-500 text-center font-bold tracking-widest w-3/4">
            EQUIPO DE FLAG FOOTBALL
          </h3>
          <h1 className="text-7xl my-2">Haz parte de nuestra familia </h1>
          <span className="text-red text-7xl my-2">ROCKETS 🚀</span>
          <div className="items-center">
            {/* <button
              type="button"
              className="mr-3 my-2 bg-red-dark font-semibold text-white rounded-3xl px-3 py-1 border-2 border-red-dark"
            >
              Conócenos
              <FontAwesomeIcon
                className="flex-1 ml-1"
                icon={["fas", "external-link-alt"]}
                size="1x"
              />
            </button> */}
            <Link to="/login">
              <button
                type="button"
                className="ml-5 my-10 font-semibold bg-white text-red-dark rounded-3xl px-3 py-1 border-2 border-red-dark"
              >
                Iniciar Sesión
              </button>
            </Link>
          </div>
        </section>
        <img
          className="w-1/2 border-1"
          src="https://i.ibb.co/W2dtvgc/right-main.png"
          alt="logo Rockets Athman"
        />
        <img
          className="w-1/2 border-1"
          src="https://i.ibb.co/7RKZL1W/left-Main.png"
          alt="logo Rockets Athman"
        />
        <section className="w-1/2 p-12">
          <h1 className="text-6xl text-red text-right my-2">CONÓCENOS</h1>
          <p className="text-2xl text-black text-right font-light my-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            vulputate lorem vitae faucibus porttitor. Suspendisse faucibus nibh
            condimentum leo luctus iaculis. Donec vitae nulla efficitur,
            pulvinar tellus sed, venenatis dui. Proin facilisis placerat porta.
            Vivamus pretium lorem in nunc vehicula, at euismod enim euismod.
            Phasellus vitae luctus justo.
          </p>
        </section>
      </div>
      <Carrousel />
      <AwardCard />
    </div>
  );
}
