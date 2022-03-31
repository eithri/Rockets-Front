import React from "react";
import { useState, useEffect } from "react";
import "./Statistics.css";
import Axios from "axios";
import StatisticCard from "../../components/StatisticCard";
import GeneralStatisticChart from "../../components/GeneralStatisticChart";
import StatisticChart from "../../components/StatisticChart";
import GeneralStatisticCard from "../../components/GeneralStatisticCard";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const headers = {
  'Content-Type': 'application/json',
  'x-access-token': cookies.get("token")
}

const tempUrl = "https://rocketsapi.herokuapp.com/api/statistic/category"

export default function Statistics() {

  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(tempUrl, { headers: headers });
      setStats(result.data);
    };
    fetchData();
  }, []);

  function isInactive(proof) {
    return Object.values(proof).every((item) => item === 0);
  }

  return (
    <div className=" p-5 m-5 custom-font-bold rounded-3xl bg-grayLi">
      <h1 className="text-black text-center text-5xl mx-auto">
        ESTADISTICAS DE EQUIPO
      </h1>
      <div className="p-2 m-2 flex flex-col text-center justify-between rounded-3xl bg-white">
        {
          Object.entries(stats).map((item) => {
            return (
              <>
                {!isInactive(item[1]) &&
                  <h1 className="text-3xl">{item[0]}</h1>
                }
                {!isInactive(item[1]) &&
                  <div className="flex flex-row pb-5">
                    <GeneralStatisticCard data={item[1]} />
                    <GeneralStatisticChart data={item[1]} />
                  </div>
                }
              </>
            )
          }
          )
        }
      </div>
    </div >
  );
}