import React from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "universal-cookie";


const cookies = new Cookies();

const headers = {
  'Content-Type': 'application/json',
  'x-access-token': cookies.get("token")
}


export default function ModalAddProofResult(props) {

  const url = "https://rocketsapi.herokuapp.com/api/proofs/addResult/" + props.proofId;

  const [showModal, setShowModal] = React.useState(false);
  const [playerName, setPlayer] = React.useState("");
  const [proofValue, setProofValue] = React.useState("");
  const [players, setPlayers] = React.useState([]);


  function handleInput() {
    if (playerName && proofValue) {
      Axios.put(url, JSON.stringify({ "playerId": playerName, "result": proofValue }), { headers: headers })
        .then(response => {
          console.log(response.data);
          window.location.reload();
        }).catch(error => {
          console.log(error);
        })

    } else {
      alert("Faltan valores o el jugador ya tiene una prueba ingresada");
    }
  }


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Axios.get(
          "https://rocketsapi.herokuapp.com/api/players", { headers: headers }
        );
        setPlayers(data);
      } catch (err) { }
    };
    fetchData();
  }, []);



  return (

    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="h-max w-max bg-red-dark font-semibold text-white rounded-md px-3 py-2 border-2 border-red-dark mx-6"
      >
        <FontAwesomeIcon
          className="flex-1 p-4 "
          icon={["fas", "user-plus"]}
          size="4x"
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
                  <h3 className="text-3xl font-semibold">
                    Agregar resultado
                  </h3>
                </div>
                <div className="relative p-6 flex flex-col content-start justify-start items-start">
                  <div className="mb-4 text-gray-700  w-full">
                    <select
                      name="gender"
                      id="gender"
                      onChange={event => setPlayer(event.target.value)}
                      className="block w-full bg-white border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg"
                      defaultValue="DEFAULT"
                      required
                    >
                      <option value="DEFAULT" disabled defaultValue>
                        Jugador:
                      </option>
                      {players.map(item => (
                        <option key={item._id} value={item._id}>
                          {item.name + " " + item.lastName}
                        </option>))}
                    </select>
                  </div>
                  <label className="custom-field content-start justify-start items-start">
                    <input
                      type="number"
                      name=""
                      onChange={event => setProofValue(event.target.value)}
                      className="mt-3"
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

