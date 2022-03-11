import React from "react";
import "./StatisticCard.css";

export default function StatisticCard(props) {
  const { averageMale, averageProof, averageFemale, bestMale, best, bestFemale,
    worstMale, worst, worstFemale, quantityMale, quantity, quantityFemale } = props.data;

  return (
    <div className=" w-1/2 flex flex-col text-center p-5">
      <div className="w-full flex flex-row justify-around border-2 border-black">
        <h1 > HOMBRES </h1>
        <br />
        <h1> MUJERES </h1>
      </div>
      <div className="w-full grid grid-cols-3 grid-rows-4 items-stretch border-2 bg-gray-dark gap-1 p-0.5 border-black ">
        <h3>{quantityMale}</h3>
        <h3>Total <br /> {quantity}</h3>
        <h3>{quantityFemale}</h3>
        <h3>{bestMale}</h3>
        <h3>Mejor <br /> {best}</h3>
        <h3>{bestFemale}</h3>
        <h3>{Math.round(averageMale)}</h3>
        <h3>Promedio General <br /> {averageProof}</h3>
        <h3>{averageFemale}</h3>
        <h3>{worstMale}</h3>
        <h3>Peor <br /> {worst}</h3>
        <h3>{worstFemale}</h3>
      </div>
    </div>
  );
}