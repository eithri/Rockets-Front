import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import { Link } from "react-router-dom";

import "./TestCardComp.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();


const url = "https://rocketsapi.herokuapp.com/api/proofs/"

const headers = {
    'Content-Type': 'application/json',
    'x-access-token': cookies.get("token")
}

export default function TestCardComp(props) {

    const { name, rateMale, rateFemale, unitMeasure, proofType } = props.test;
    const proofUrl = "/dashboard/proof/" + props.test._id;

    function editTest() {
        cookies.set("testEditId", props.test._id);
        window.location.href = "/dashboard/edit-proof"
    }

    function deleteTest() {
        const answer = window.confirm("¿Desea eliminar la prueba?")
        if (answer) {
            Axios.delete(url + props.test._id, { headers: headers })
                .then((res) => {
                    window.alert("Prueba eliminada");
                    window.location.href = "/dashboard/proof"

                }).catch((error) => {
                    console.log(error)
                })
        }
    }

    return (
        <div className="p-5 m-5 flex flex-row justify-between rounded-3xl bg-gray-50 shadow-xl">
            <Link to={proofUrl} className="flex-1">
                <div className="flex-1">
                    {name}
                </div>
            </Link>
            <Link to={proofUrl} className="flex-1">
                <div className="flex-1">
                    <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">{proofType.name}</span>
                </div>
            </Link>
            <Link to={proofUrl} className="flex-1">
                <div className="flex-1">
                    {unitMeasure.name}
                </div>
            </Link>
            <Link to={proofUrl} className="flex-1">
                <div className="flex-1">
                    <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">{rateMale}</span>
                </div>
            </Link>
            <Link to={proofUrl} className="flex-1">
                <div className="flex-1">
                    <span className="bg-pink-200 text-pink-600 py-1 px-3 rounded-full text-xs">{rateFemale}</span>
                </div>
            </Link>
            <div className="flex-1 flex">
                <div className="flex-1  ">
                    <button
                        type="button"
                        onClick={editTest}>
                        <FontAwesomeIcon
                            className="flex-1 ml-2 hover:text-red-900"
                            icon={["fas", "edit"]}
                            size="1x"
                        />
                    </button>
                </div>
                <div className="flex-1 transform hover:text-red-900">
                    <button
                        type="button"
                        onClick={deleteTest}>
                        <FontAwesomeIcon
                            className="flex-1 ml-2"
                            icon={["fas", "trash-alt"]}
                            size="1x"
                        />
                    </button>
                </div>
            </div>

        </div>

    );
}

