import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import PlaybookCard from "../../components/PlaybookCard/PlaybookCard";
import { Link } from "react-router-dom";

import "./PlaybookScreen.css";
import Cookies from "universal-cookie";


const cookies = new Cookies();

const headers = {
  'Content-Type': 'application/json',
  'x-access-token': cookies.get("token")
}


export default function PlaybookScreen(props) {


  const [playbooks, setPlaybooks] = useState([]);
  const [playbooksList, setPlaybooksList] = useState([]);
  const [search, setSearch] = useState("");

  var isAdmin = false;

  function validateRole() {
    if (cookies.get("roles")) {
      if (cookies.get("roles").includes("61258e1ba11f773a00be1cb7") || cookies.get("roles").includes("61258e1ba11f773a00be1cb8")) {
        isAdmin = true;
      }
    }
  }

  validateRole();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Axios.get(
          "https://rocketsapi.herokuapp.com/api/playbook", { headers: headers }
        );
        setPlaybooks(data);
        setPlaybooksList(data);
      } catch (err) { }
    };
    fetchData();
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
    filterValues(e.target.value);
  }

  const filterValues = (searchValue) => {
    var searchResult = playbooksList.filter((value) => {
      if (value.name.toString().toLowerCase().includes(searchValue.toLowerCase())) {
        return value;
      }
      return undefined;
    })
    setPlaybooks(searchResult);
  }



  return (
    <div className="custom-font-bold">
      <div className="p-5 m-5 flex flex-row justify-between rounded-3xl bg-grayLi">

        <div className="flex content-center justify-center items-center mr-2 h-16 w-1/3 bg-red-dark font-semibold rounded-xl px-3 py-1 border-2 border-red-dark">
          <input className="text-black w-1/2 border-2 h-8 border-black rounded pl-3" value={search}
            placeholder="Buscar playbooks"
            onChange={handleChange}
          />

          <FontAwesomeIcon
            id="disabledButton"
            className="ml-2 text-white"
            icon={["fas", "search"]}
            size="1x"
          />

        </div>
        
          <button
            type="button"
            onClick={() => (window.location.href = "/dashboard/create-playbook")}
            className="mr-2 h-16 w-1/3 bg-red-dark font-semibold text-white rounded-xl px-3 py-1 border-2 border-red-dark"
          >
            CREAR PLAYBOOK
            <FontAwesomeIcon
              className="flex-1 ml-1"
              icon={["fas", "plus-circle"]}
              size="1x"
            />
          </button>
        
      </div>
      <div className="flex flex-row">
        <section className="w-full m-5 bg-grayLi rounded-2xl">
          <h1 className="rounded-2xl text-center py-5 bg-gray-dark text-white text-5xl">
            PLAYBOOKS
          </h1>
          <div className="w-full flex flex-wrap">
            {playbooks.map((playbook) => (
              <PlaybookCard key={playbook._id} playbook={playbook} />
            ))}
          </div>
        </section>
      </div>
    </div>

  );
}
