import React from "react";
import picture from "../../assets/profile_picture.jpg";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


import "./PlayerCard.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const url = "https://rocketsapi.herokuapp.com/api/players/"

const headers = {
  'Content-Type': 'application/json',
  'x-access-token': cookies.get("token")
}

var isAdmin = false;


export default function PlayerCard(props) {
  const { name, imgUrl, height, weight, birthday } = props.player;

  function editPlayer() {
    cookies.set("playerEditID", props.player._id);
    window.location.href = "/dashboard/editplayer";
  }

  function deletePlayer() {
    const answer = window.confirm("¿Desea eliminar el jugador?")
    if (answer) {
      Axios.delete(url + props.player._id, { headers: headers })
        .then((res) => {
          window.alert("Jugador eliminado");
          window.location.href = "/dashboard/playerscreen"

        }).catch((error) => {
          console.log(error)
        })
    }
  }
  const userUrl = "/dashboard/player/" + props.player.user._id

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  function validateRole() {
    if (cookies.get("roles")) {
      if (cookies.get("roles").includes("6163b638fc2dd498791f9e9d") || cookies.get("roles").includes("6163b638fc2dd498791f9e9c")) {
        isAdmin = true;
      }
    }
  }

  validateRole();
  return (
    <div>
      <div className="custom-font flex flex-col bg-white rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52">
        <Link to={userUrl}>
          <div className="flex justify-center">
            <img src={imgUrl} alt="" className="h-24 w-24 rounded-3xl m-6" />
          </div>
        </Link>
        <p className="text-center text-base leading-6 px-2 pb-2 uppercase">
          {name}
        </p>
        <div className="flex flex-col text-base leading-6 mx-6 text-gray-700 sm:text-lg sm:leading-7 mb-3">
          <p>Estatura: {height} cm</p>
          <p>Peso: {weight} kg</p>
          <p>Edad: {getAge(birthday)} años</p>
        </div>
        {isAdmin &&
          <div className="border-solid border-red-800 border-2 rounded-b-lg text-white p-3 text-center transition-all duration-500">
            <button
              type="button"
              onClick={editPlayer}
              className="mr-2 bg-red-dark font-semibold text-white rounded-3xl px-3 py-1 border-2 border-red-dark"
            >
              Editar
              <FontAwesomeIcon
                className="flex-1 ml-1"
                icon={["fas", "edit"]}
                size="1x"
              />
            </button>
            <button
              type="button"
              onClick={deletePlayer}
              className="mr-2 bg-red-dark font-semibold text-white rounded-3xl px-3 py-1 border-2 border-red-dark"
            >
              Borrar
              <FontAwesomeIcon
                className="flex-1 ml-1"
                icon={["fas", "trash-alt"]}
                size="1x"
              />
            </button>
          </div>
        }
      </div>



    </div>
  );
}

