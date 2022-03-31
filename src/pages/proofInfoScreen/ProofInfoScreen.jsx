import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import PlayerProofCard from "../../components/playerProofCard/PlayerProofCard";
import ModalAddProofResult from "../../components/modalAddProofResult/ModalAddProofResult";

import "./ProofInfoScreen.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const headers = {
  'Content-Type': 'application/json',
  'x-access-token': cookies.get("token")
}

export default function ProofInfoScreen(props) {

  const proofId = props.location.pathname.split("/")[3];

  const [proofInfo, setProof] = useState([]);
  const [players, setPlayers] = useState([]);
  const [playersCardList, setPlayersCardList] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Axios.get(
          "https://rocketsapi.herokuapp.com/api/proofs/" + proofId, { headers: headers }
        );
        setProof(data);
        setPlayers(data.listPlayers);
        setPlayersCardList(data.listPlayers);
      } catch (err) { }
    };
    fetchData();
  }, [proofId]);

  const handleChange = e => {
    setSearch(e.target.value);
    filterValues(e.target.value);
  }

  const filterValues = (searchValue) => {
    var searchResult = playersCardList.filter((value) => {
      if (value.playerId.name.toString().toLowerCase().includes(searchValue.toLowerCase())) {
        return value;
      }
      return undefined;
    })
    setPlayers(searchResult);
  }
  return (
    <div className="custom-font-bold">
      <div className="p-5 m-5 flex flex-row justify-between rounded-3xl bg-grayLi items-center">
        <div className="flex content-center justify-center items-center mr-2 h-16 w-1/3 bg-red-dark font-semibold rounded-xl px-3 py-1 border-2 border-red-dark">
          <input className="text-black w-1/2 border-2 h-8 border-black rounded pl-3 focus:outline-none" value={search}
            placeholder="Buscar por jugadores"
            onChange={handleChange}
          />
          <FontAwesomeIcon
            id="disabledButton"
            className="ml-2 text-white"
            icon={["fas", "search"]}
            size="1x"
          />
        </div>

        <div className="p-5 m-5 flex flex-row justify-around rounded-xl bg-gray-50 shadow-xl w-2/3">

          <div className="flex justify-start w-2/3">
            <span className="font-black mx-3">Prueba: {proofInfo.name}</span>
            <span className="font-medium">Descripción: {proofInfo.description}</span>
          </div>
          <div className="flex justify-center w-1/3">
            <span className="bg-pink-200 text-pink-600 py-1 px-3 mx-4 rounded-full text-xs">{proofInfo.rateMale}</span>
            <span className="bg-blue-200 text-pink-600 py-1 px-3 rounded-full text-xs">{proofInfo.rateFemale}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="w-full m-5 bg-grayLi rounded-2xl p-3">
          <div className="w-full flex content-center justify-center items-center flex-wrap">

            {players
              .map((player) => (
                <PlayerProofCard key={player.playerId._id} player={player} proofName={proofInfo.name} infoMeasure={proofInfo.unitMeasure.name} proofType={proofInfo.proofType.name} proofId={proofId} />
              ))}
            <ModalAddProofResult proofId={proofId} />
          </div>


        </div>

      </div>
    </div>
  );
}
