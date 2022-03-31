/* eslint-disable */
import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./DashboardMenu.css";
import { Link } from "react-router-dom";

// Pages
import PlayerCard from "../PlayerCard/PlayerCard";
import PlayersScreen from "../../pages/PlayersScreen";
import registerPlayer from "../../pages/registerPlayer";
import EditPlayer from "../../pages/EditPlayer";
import TestScreen from "../../pages/TestScreen";
import Statistics from "../../pages/Statistics";
import TestCardComp from "../TestCardComp/TestCardComp";
import CreateTest from "../../pages/CreateTest";
import EditTest from "../../pages/EditTest";
import PlayerInfo from "../../pages/playerInfo/PlayerInfo";
import PlaybookScreen from "../../pages/PlaybookScreen";
import CreatePlaybook from "../../pages/CreatePlaybook/CreatePlaybook";
import ProofInfoScreen from "../../pages/proofInfoScreen/ProofInfoScreen";

import Cookies from "universal-cookie";
import PlaybookInfo from "../../pages/PlaybookInfo/PlaybookInfo";
import CreatePlay from "../../pages/CreatePlay/CreatePlay";
import EditPlay from "../../pages/EditPlay";
import EditPlaybook from "../../pages/EditPlaybook/EditPlaybook";


const cookies = new Cookies();

export default function DashboardMenu(props) {

  var isAdmin = false;
  const instance = axios.create({
    headers: {
      "Access-Control-Allow-Origin": "*",
      "x-access-token": cookies.get("token")
    },
  });

  let { path } = useRouteMatch();

  function logOut() {
    cookies.remove("token");
    cookies.remove("username");
    cookies.remove("roles");
    cookies.remove("email");
    window.location.href = "/";
  }

  function tokenValidate() {
    if (cookies.get("token") == undefined) {
      window.location.href = "/";
    }
  }

  function loadUser() {
    instance.get("https://rocketsapi.herokuapp.com/api/users/")
      .then(response => {
        var result = response.data.find(obj => {
          return obj.email === cookies.get("email");
        });
        cookies.set("username", result.username);
        cookies.set("roles", result.roles);
      }).catch((error) => {
        console.log(error);
      });
  }

  function validateRole() {
    if (cookies.get("roles")) {
      if (cookies.get("roles").includes("6163b638fc2dd498791f9e9d") || cookies.get("roles").includes("6163b638fc2dd498791f9e9c")) {
        isAdmin = true;
      }
    }
  }

  tokenValidate();
  loadUser();
  validateRole();

  return (
    <div className="header relative w-full min-h-screen flex" >
      <div className="relative bg-red min-w-max flex-col">
        <img
          className="w-32 align-middle mx-auto rounded-full mt-10"
          src="https://i.ibb.co/WgBTFBj/profile-picture.jpg"
          alt="Profile Photo"
        />
        <h1 className="justify-center text-center px-5 pb-5 pt-3 text-3xl text-white font-extrabold ">
          {cookies.get("username")}
        </h1>
        <Link to="/dashboard">
          <article className="block p-5 w-60 text-2xl text-white font-extrabold bg-gray-dark hover:bg-gray-900">
            <FontAwesomeIcon
              className="flex-1 mx-2"
              icon={["fas", "users"]}
              size="1x"
            />
            Plantilla
          </article>
        </Link>
        <nav>
        </nav>
        {isAdmin &&
          <Link to="/dashboard/proof">
            <article className="block p-5 text-xl text-white font-extrabold bg-gray-dark mt-1 hover:bg-gray-900">
              <FontAwesomeIcon
                className="flex-1 mx-2"
                icon={["fas", "clipboard-list"]}
                size="1x"
              />
              Pruebas de Rendimiento
            </article>
          </Link>
        }
        <nav>
        </nav>
        <Link to="/dashboard/playbook">
          <article className="block p-5 text-xl text-white font-extrabold bg-gray-dark mt-1 hover:bg-gray-900">
            <FontAwesomeIcon
              className="flex-1 mx-2"
              icon={["fas", "running"]}
              size="1x"
            />
            Playbooks
          </article>
        </Link>
        {isAdmin &&
          <Link to="/dashboard/statistics">
            <article className="block p-5 text-xl text-white font-extrabold bg-gray-dark mt-1 hover:bg-gray-900">
              <FontAwesomeIcon
                className="flex-1 mx-2"
                icon={["far", "chart-bar"]}
                size="1x"
              />
              Estadisticas
            </article>
          </Link>
        }
        <article className="absolute bottom-0 w-60 block p-5 text-base text-white font-extrabold bg-gray-dark mt-1 hover:bg-gray-900" onClick={logOut}>
          <FontAwesomeIcon
            className="flex-1 mx-2"
            icon={["fas", "users"]}
            size="1x"
          />
          Cerrar sesión
        </article>
      </div>
      <div className="flex flex-col w-full">
        <div className="bg-gray-dark flex items-center justify-center w-full h-28">
          <Switch>
            <Route path={`${path}/registerplayer`}>
              <h1 className="text-6xl text-white">REGISTRAR JUGADOR</h1>
            </Route>
            <Route path={`${path}/create-test`}>
              <h1 className="text-6xl text-white">CREAR PRUEBA DE RENDIMIENTO</h1>
            </Route>
            <Route path={`${path}/editplayer`}>
              <h1 className="text-6xl text-white">EDITAR JUGADOR</h1>
            </Route>
            <Route path={`${path}/edit-proof`}>
              <h1 className="text-6xl text-white">EDITAR PRUEBA</h1>
            </Route>
            <Route path={`${path}/edit-play/:playbookid`}>
              <h1 className="text-6xl text-white">EDITAR PLAY</h1>
            </Route>
            <Route path={`${path}/edit-playbook/:playbookid`}>
              <h1 className="text-6xl text-white">EDITAR PLAYBOOK</h1>
            </Route>
            <Route path={`${path}/test`}>
              <h1 className="text-6xl text-white">PRUEBAS DE RENDIMIENTO</h1>
            </Route>
            <Route path={`${path}/playbook`}>
              <h1 className="text-6xl text-white">PLAYBOOKS</h1>
            </Route>
            <Route path={`${path}/create-playbook`}>
              <h1 className="text-6xl text-white">CREAR PLAYBOOK</h1>
            </Route>
            <Route path={`${path}/playbook/:playbookid`}>
              <h1 className="text-6xl text-white">PLAYBOOKS</h1>
            </Route>
            <Route path={`${path}/create-play/:playbookid`}>
              <h1 className="text-6xl text-white">CREAR PLAY</h1>
            </Route>
            <Route path={`${path}/proof`}>
              <h1 className="text-6xl text-white">PRUEBAS DE RENDIMIENTO</h1>
            </Route>
            <Route path={`${path}/statistics`}>
              <h1 className="text-6xl text-white">ESTADISTICAS</h1>
            </Route>
            <Route path={`${path}*`} exact>
              <h1 className="text-6xl text-white">JUGADORES</h1>
            </Route>
          </Switch>
        </div>
        <div className="bg-gray min-h-screen w-full">
          <Switch>
            <Route path={`${path}/card`} component={PlayerCard} />
            <Route path={`${path}/testcard`} component={TestCardComp} />

            <Route path={`${path}/create-playbook`} component={CreatePlaybook} />
            <Route path={`${path}/create-play/:playbookid`} component={CreatePlay} />
            <Route path={`${path}/registerplayer`} component={registerPlayer} />
            <Route path={`${path}/create-test`} component={CreateTest} />

            <Route path={`${path}/editplayer`} component={EditPlayer} />
            <Route path={`${path}/edit-proof`} component={EditTest} />
            <Route path={`${path}/edit-play/:playbookid`} component={EditPlay} />
            <Route path={`${path}/edit-playbook/:playbookid`} component={EditPlaybook} />
            <Route path={`${path}/player/:playerid`} component={PlayerInfo} />

            <Route path={`${path}/playbook/:playbookid`} component={PlaybookInfo} />
            <Route path={`${path}/test`} component={TestScreen} />
            <Route path={`${path}/playbook`} component={PlaybookScreen} />

            <Route path={`${path}/player/:playerid`} component={PlayerInfo} />
            <Route path={`${path}/proof/:proofid`} component={ProofInfoScreen} />

            <Route path={`${path}/statistics`} component={Statistics} />
            <Route path={`${path}/proof`} component={TestScreen} />
            <Route path={`${path}*`} component={PlayersScreen} />
          </Switch>
        </div>
      </div>
    </div >
  );
}

