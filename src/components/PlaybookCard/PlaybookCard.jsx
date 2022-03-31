import React from "react";
import picture from "../../assets/profile_picture.jpg";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


import "./PlaybookCard.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const url = "https://rocketsapi.herokuapp.com/api/playbook/"

const headers = {
  'Content-Type': 'application/json',
  'x-access-token': cookies.get("token")
}

// var isAdmin = false;

export default function PlaybookCard(props) {
  const { name, imgUrl, description } = props.playbook;

  function editPlaybook() {
    cookies.set("playbookToEdit", props.playbook._id)
    window.location.href = "/dashboard/edit-playbook/" + props.playbook._id

  }

  function deletePlaybook() {
    const answer = window.confirm("¿Desea eliminar el playbook?")
    if (answer) {
      Axios.delete(url + props.playbook._id, { headers: headers })
        .then((res) => {
          window.alert("Playbook eliminado");
          window.location.href = "/dashboard/playbook/"
        }).catch((error) => {
          console.log(error)
        })
    }
  }

  function prueba() {
    console.log(props.playbook._id)
  }

  const baseUrl = "/dashboard/playbook/" + props.playbook._id

  return (
    <div>
      <Link to={baseUrl}>
        <div className="flex flex-row m-6">
          <section className="flex justify-center items-center px-2">
            <div
              className="wrapper max-w-xs bg-gray-50 rounded-md shadow-lg overflow-hidden"
            >
              <div>
                <img src={imgUrl} className="h-96 w-96" alt="playbook" />
              </div>
              <div className="p-3">
                <span className="bg-pink-200 text-red-600 py-1 px-3 rounded-full text-xl">{name}</span>
                <p className="mx-2 my-4 text-md text-gray-900">
                  {description}
                </p>
                <button
                  type="button"
                  className="flex-1 transform hover:text-red-900"
                  onClick={deletePlaybook}>
                  <FontAwesomeIcon
                    className="flex-1 ml-2"
                    icon={["fas", "trash-alt"]}
                    size="1x"
                  />
                </button>
                <button
                  type="button"
                  className="flex-1 transform hover:text-red-900"
                >
                  <FontAwesomeIcon
                    className="flex-1 ml-2"
                    onClick={editPlaybook}
                    icon={["fas", "edit"]}
                    size="1x"
                  />
                </button>
              </div>
            </div>
          </section>
        </div>
      </Link>

    </div>





  );
}



/*<div className="custom-font py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-l sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-red to-black shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          <div className="relative bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="">
              <div className="-my-14 flex justify-center items-start">
                <p className="absolute border  border-black ml-15 bg-gray-300 margin-pos px-2">
                  QB
                </p>
                <div className="border-solid border-black">
                  <img
                    src={picture}
                    className="h-20 w-20 rounded-3xl"
                    alt="profile_picture"
                  />
                </div>
              </div>
              <div className="mt-16 text-base leading-6 space-y-2 text-gray-700 sm:text-lg sm:leading-7">
                NOMBRE DEL JUGADOR
              </div>
              <div className="py-4 flex flex-col text-base leading-6  text-gray-700 sm:text-lg sm:leading-7">
                <p>ESTATURA:</p>
                <p>PESO: </p>
                <p>EDAD: </p>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <button
                  type="button"
                  // onClick={() => this.iniciarSesion()}
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
                  // onClick={() => this.iniciarSesion()}
                  className="mr-2 bg-red-dark font-semibold text-white rounded-3xl px-3 py-1 border-2 border-red-dark"
                >
                  Borrar
                  <FontAwesomeIcon
                    className="flex-1 ml-1"
                    icon={["fas", "save"]}
                    size="1x"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
*/

