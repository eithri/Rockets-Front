import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./PlayerProofCard.css";
import Cookies from "universal-cookie";
import ModalEditProofResult from "../modalEditProofResult/ModalEditProofResult";

const cookies = new Cookies();

const headers = {
  'Content-Type': 'application/json',
  'x-access-token': cookies.get("token")
}


export default function PlayerProofCard(props) {

  const proofName = props.proofName;
  const { name, position } = props.player.playerId;
  const measure = props.infoMeasure;
  const value = props.player.result;
  const proofType = props.proofType;
  const playerId = props.player.playerId._id;

  const url = "https://rocketsapi.herokuapp.com/api/proofs/deleteResult/" + props.proofId;

  function deleteResult() {
    const answer = window.confirm("¿Desea eliminar el resultado?")
    if (answer) {

      fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({ "playerId": playerId }),
        headers: headers
      })
        .then(res => res.text())
        .then(res => {
          window.alert("Resultado eliminado");
          window.location.reload();
        }).catch((error) => {
          console.log(error);
          window.alert("Error al eliminar");
        })
    }
  }
  return (

    <div className="border-red-800 border-2 custom-font flex flex-col bg-white rounded-md shadow-md w-full m-6 overflow-hidden sm:w-52">
      <div className=" border-b border-red-800 p-3 text-center text-lg ">
        <p className="font-black">{proofName} ({proofType})</p>
      </div>
      <div className="flex flex-col items-center font-medium justify-center text-base leading-6 mx-6 pt-3 text-gray-700 sm:text-lg sm:leading-7 ">
        <p >{name} - {position}</p>
        <p>{value} {measure}</p>
      </div>

      <div className="text-white p-3 text-center transition-all duration-500">
        {/* <button
          type="button"
          //onClick={editPlayer}
          className="mr-2 bg-red-dark font-semibold text-white px-3 py-1 border-2 border-red-dark"
        >
          Editar
          <FontAwesomeIcon
            className="flex-1 ml-1"
            icon={["fas", "edit"]}
            size="1x"
          />
        </button> */}
        <ModalEditProofResult parentProps={props} />
        <button
          type="button"
          onClick={deleteResult}
          className="mr-2 bg-red-dark font-semibold text-white px-3 py-1 border-2 border-red-dark"
        >
          Borrar
          <FontAwesomeIcon
            className="flex-1 ml-1"
            icon={["fas", "trash-alt"]}
            size="1x"
          />
        </button>
      </div>

    </div>
  );
}