import React, { useEffect, useState } from "react";

import Cookies from "universal-cookie";
import "./PlaybookInfo.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import PlayCard from "../../components/PlayCard/PlayCard";

import "./PlaybookInfo.css";



const cookies = new Cookies();

export default function PlaybookInfo(props) {
    var isOwnProfile = false;
    const url = "http://3.238.91.249:4000/api/playbooks/" + props.match.params.playbookid;
    // const userUrl = "http://3.238.91.249:4000/api/users/" + props.match.params.playerid;

    const [playbooks, setPlaybooks] = useState([]);
    const [playbooksList, setPlaybooksList] = useState([]);
    const [search, setSearch] = useState("");

    // var isAdmin = false;

    // function validateRole() {
    //   if (cookies.get("roles")) {
    //     if (cookies.get("roles").includes("61258e1ba11f773a00be1cb7") || cookies.get("roles").includes("61258e1ba11f773a00be1cb8")) {
    //       isAdmin = true;
    //     }
    //   }
    // }

    // validateRole();
    const headers = {
        "Content-Type": "application/json",
        "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjNiYzYwOGFlOGIxOThmMTQ1YTk1NyIsImlhdCI6MTYzMzkzMjY0NSwiZXhwIjoxNjM0MDE5MDQ1fQ.qwkCKYzvA6YY2FNInAZdpRMd0a0c_lsyjJl1rMF5kvM"
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await Axios.get(
                    "http://3.238.91.249:4000/api/playbook/" + props.match.params.playbookid, { headers: headers }
                );
                setPlaybooks(data.plays);
                setPlaybooksList(data.plays);
                console.log(props.match.params.playbookid)
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
                        placeholder="Buscar plays"
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
                    onClick={() => (window.location.href = "/dashboard/create-play/" + props.match.params.playbookid)}
                    className="mr-2 h-16 w-1/3 bg-red-dark font-semibold text-white rounded-xl px-3 py-1 border-2 border-red-dark"
                >
                    CREAR PLAY
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
                        PLAYS
                    </h1>
                    <div className="w-full flex flex-wrap">
                        {playbooks.map((play) => (
                            <PlayCard key={play._id} play={play} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
