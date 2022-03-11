import React, { useEffect, useState } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TestCardComp from "../../components/TestCardComp/TestCardComp";

import "./TestScreen.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const headers = {
  'Content-Type': 'application/json',
  'x-access-token': cookies.get("token")
}

export default function TestScreen(props) {

  const [tests, setTests] = useState([]);
  const [testList, setTestList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Axios.get(
          "http://3.238.91.249:4000/api/proofs", { headers: headers }
        )
        setTests(data)
        setTestList(data)
      } catch (err) { }
    }
    fetchData()

  }, [])

  const handleChange = e => {
    setSearch(e.target.value);
    filterValues(e.target.value);
  }

  const filterValues = (searchValue) => {
    var searchResult = testList.filter((value) => {
      if (value.name.toString().toLowerCase().includes(searchValue.toLowerCase())) {
        return value;
      }
      return undefined;
    })
    setTests(searchResult);
  }

  return (

    <div className="custom-font-bold">
      <div className="p-5 m-5 flex flex-row justify-between rounded-3xl bg-grayLi">

        <div className="flex content-center justify-center items-center mr-2 h-16 w-1/3 bg-red-dark font-semibold rounded-xl px-3 py-1 border-2 border-red-dark">
          <input className="text-black w-1/2 border-2 h-8 border-black rounded pl-3" value={search}
            placeholder="Buscar pruebas"
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
          onClick={() => (window.location.href = "/dashboard/create-test")}
          className="mr-2 h-16 w-1/3 bg-red-dark font-semibold text-white rounded-xl px-3 py-1 border-2 border-red-dark"
        >
          CREAR PRUEBA DE RENDIMIENTO
          <FontAwesomeIcon
            className="flex-1 ml-1"
            icon={["fas", "plus-circle"]}
            size="1x"
          />
        </button>
      </div>

      <div>
        {tests.map((test) => (
          <TestCardComp key={test._id} test={test} />
        ))}

      </div>
    </div>













  );
}
