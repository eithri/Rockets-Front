import React from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "universal-cookie";
import "./ModalEditProofResult.css";


const cookies = new Cookies();

const headers = {
  'Content-Type': 'application/json',
  'x-access-token': cookies.get("token")
}


export default function ModalEditProofResult(props) {

  const proofId = props.parentProps.proofId;
  const playerId = props.parentProps.player.playerId._id;
  const playerName = props.parentProps.player.playerId.name + " " + props.parentProps.player.playerId.lastName;

  const url = "https://rocketsapi.herokuapp.com/api/proofs/editResult/" + proofId;


  const [showModal, setShowModal] = React.useState(false);
  const [proofValue, setProofValue] = React.useState("");


  function handleInput() {
    if (proofValue) {
      Axios.put(url, JSON.stringify({ "playerId": playerId, "result": proofValue }), { headers: headers })
        .then(response => {
          console.log(response.data);
          window.location.reload();
        }).catch(error => {
          console.log(error);
        })

    } else {
      alert("Faltan valores");
    }
  }
  return (

    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="mr-2 bg-red-dark font-semibold text-white px-3 py-1 border-2 border-red-dark"
      >
        Editar
        <FontAwesomeIcon
          className="flex-1 ml-1"
          icon={["fas", "edit"]}
          size="1x"
        />
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex justify-center text-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black">
                    Editar resultado
                  </h3>
                </div>
                <div className="relative p-6 flex flex-col content-start justify-start items-start">
                  <div className="mb-4 text-gray-700  w-full">
                    <select
                      name="gender"
                      id="gender"
                      className="block w-full bg-white border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg"
                      defaultValue="DEFAULT"
                      required
                    >
                      <option value="DEFAULT" disabled defaultValue>
                        {playerName}
                      </option>

                    </select>
                  </div>
                  <label className="custom-field content-start justify-start items-start">
                    <input
                      type="number"
                      name=""
                      defaultValue={props.parentProps.player.result}
                      onChange={event => setProofValue(event.target.value)}
                      className="mt-3 text-black"
                      required
                    />
                    <span className="placeholder">Resultado</span>
                  </label>
                </div>
                <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>

                  <button
                    className="bg-red-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleInput}
                  >
                    aceptar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

