import React from "react";
import axios from "axios";

import Cookies from "universal-cookie";
import "./PlayerInfo.css";


const cookies = new Cookies();

export default function PlayerInfo(props) {
  var isOwnProfile = false;
  const url = "http://3.238.91.249:4000/api/users/player/" + props.match.params.playerid;
  const userUrl = "http://3.238.91.249:4000/api/users/" + props.match.params.playerid;

  const headers = {
    "Content-Type": "application/json",
    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzAzNTE1ZDhmNjAxOWUyYmViOGFiZSIsImlhdCI6MTYzMzU1NDE3MiwiZXhwIjoxNjMzNjQwNTcyfQ.pR3wd2Q92wfuV-nbAJZLn6BD73PQZ-M_eYF1WYRHLcs"
  };

  var myInit = {
    method: 'GET',
    headers: new Headers({
      "Content-Type": "application/json",
      "x-access-token": cookies.get("token")
    }),
    mode: 'cors',
    cache: 'default'
  };

  var myRequest = new Request(url, myInit);

  fetch(myRequest)
    .then(response => response.json())
    .then((responseData) => {
      if (responseData) {
        document.getElementById('img').src = responseData.imgUrl;
        document.getElementById('dob').innerHTML = responseData.birthday;
        document.getElementById('document').innerHTML = responseData.documentId;
        document.getElementById('eps').innerHTML = responseData.eps;
        document.getElementById('address').innerHTML = responseData.address;
        document.getElementById('phone').innerHTML = responseData.phone;
        document.getElementById('name').innerHTML = responseData.name.toUpperCase() + " " + responseData.lastName.toUpperCase();
        document.getElementById('position').innerHTML = responseData.position;
        document.getElementById('weight').innerHTML = "Peso: " + responseData.weight + " kg";
        document.getElementById('height').innerHTML = "Altura: " + responseData.height + " cm";

      } else {
        console.log("datos vacíos");
      }
    }).catch((error) => {
      console.log(error.message);
    })

  axios
    .get(userUrl, { headers: headers })
    .then((response) => {
      document.getElementById('email').innerHTML = response.data.email;
      if (response.data.email === cookies.get("email")) {
        isOwnProfile = true;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });

  console.log(isOwnProfile);
  return (
    <div className="w-full min-h-screen pl-20 pr-20 bg-auto object-fill back-image">
      <div className="flex justify-center">
        <div className="block content-center justify-center items-center">
          <div className="relative content-center justify-center items-center" >
            <img id="img" alt="" className="w-80 rounded-full mx-10 mt-10" />
            <h1 id="name" className="text-gray-600 mt-5 text-4xl text-center">
            </h1>
            <h1 id="position" className="mt-2 text-3xl text-gray-600 text-center ">
            </h1>
          </div>


          <div className="flex justify-around space-x-20 ">
            <h1 id="weight" className="text-xl text-gray-600">
            </h1>
            <h1 id="height" className="text-xl text-gray-600">
            </h1>
          </div>
        </div>
        <div className="w-1/3 bg-gray-300 ml-20 mt-10 py-10 pl-10 rounded-2xl ">
          <p >
            FECHA DE NACIMIENTO
          </p>
          <p id="dob" className="mb-2 text-gray-600">
          </p>

          <p >
            CORREO ELECTRÓNICO
          </p>
          <p id="email" className="mb-2 text-gray-600">
          </p>

          <p >
            DOCUMENTO
          </p>
          <p id="document" className="mb-2 text-gray-600">

          </p>

          <p >
            EPS
          </p>
          <p id="eps" className="mb-2 text-gray-600">
          </p>


          <p >
            DIRECCIÓN
          </p >
          <p id="address" className="mb-2 text-gray-600">
          </p>

          <p >
            TELÉFONO
          </p>
          <p id="phone" className="text-gray-600">
          </p>
        </div>
      </div >
    </div>
  );
}
