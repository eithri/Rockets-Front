import React from "react";
import "./AwardCard.css";

export default function AwardCard() {
  return (
    <div className="flex flex-wrap justify-center w-full">
      <h1 className="py-10 text-6xl w-full text-center text-red">Logros 🏆</h1>
      <div className="bg-white w-1/5 z-50 -mx-20 rounded-full border-2 border-black">
        <img src="https://i.ibb.co/JcpBMGP/medal-1622523-640.png" alt="medal-1622523-640" />
      </div>
      {/*Logro 1*/}
      <div className="rounded-3xl transform -rotate-2 my-10 bg-black w-3/5 z-0">
        <div className="rounded-3xl px-10 py-5 ml-12 flex flex-col transform rotate-2 bg-red text-white z-40">
          <h1 className="text-5xl" >Logro 1</h1>
          <h2 className="text-2xl custom-font font-normal " >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pulvinar venenatis lacinia tincidunt integer morbi sed vitae, purus. Pellentesque ut aliquet egestas lacus, adipiscing egestas elementum, adipiscing sed.</h2>
        </div>
      </div>
      {/*Logro 2*/}
      <div className="rounded-3xl transform -rotate-2 my-10 bg-black w-3/5 z-0">
        <div className="rounded-3xl px-10 py-5 mr-12 flex flex-col transform rotate-2 bg-red text-white z-40">
          <h1 className="text-5xl" >Logro 2</h1>
          <h2 className="text-2xl custom-font font-normal " >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pulvinar venenatis lacinia tincidunt integer morbi sed vitae, purus. Pellentesque ut aliquet egestas lacus, adipiscing egestas elementum, adipiscing sed.</h2>
        </div>
      </div>
      <div className="bg-white w-1/5 z-50 -mx-20 rounded-full border-2 border-black">
        <img src="https://i.ibb.co/JcpBMGP/medal-1622523-640.png" alt="medal-1622523-640" />
      </div>
      <span className="w-full"></span>
      {/*Logro 3*/}
      <div className="bg-white w-1/5 z-50 -mx-20 rounded-full border-2 border-black">
        <img src="https://i.ibb.co/JcpBMGP/medal-1622523-640.png" alt="medal-1622523-640" />
      </div>
      <div className="rounded-3xl transform -rotate-2 my-10 bg-black w-3/5 z-0">
        <div className="rounded-3xl px-10 py-5 ml-12 flex flex-col transform rotate-2 bg-red text-white z-40">
          <h1 className="text-5xl" >Logro 3</h1>
          <h2 className="text-2xl custom-font font-normal " >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pulvinar venenatis lacinia tincidunt integer morbi sed vitae, purus. Pellentesque ut aliquet egestas lacus, adipiscing egestas elementum, adipiscing sed.</h2>
        </div>
      </div>
    </div >
  );
}