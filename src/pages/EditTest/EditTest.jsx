import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "universal-cookie";
import "./EditTest.css";


const cookies = new Cookies();
const url =
    "http://3.238.91.249:4000/api/proofs/" + cookies.get("testEditId");

const headers = {
    "Content-Type": "application/json",
    'x-access-token': cookies.get("token")
};

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Campo obligatorio';
    } else if (values.name.length > 100) {
        errors.name = 'El nombre debe tener menos de 100 caracteres';
    }
    if (!values.proofType) {
        errors.proofType = 'Se debe escoger una opción';
    }
    if (!values.unitMeasure) {
        errors.unitMeasure = 'Se debe escoger una opción';
    }
    const rateMale = parseInt(values.rateMale);
    if (!values.rateMale) {
        errors.rateMale = "Campo obligatorio";
    } else if (rateMale > 300 || rateMale < 1) {
        errors.rateMale = "La estimación debe ser positiva";
    }

    const rateFemale = parseInt(values.rateFemale);
    if (!values.rateFemale) {
        errors.rateFemale = "Campo obligatorio";
    } else if (rateFemale > 300 || rateFemale < 1) {
        errors.rateFemale = "La estimación debe ser positiva";
    }
    return errors;
}

export default class EditTest extends Component {

    state = {
        errors: {
        }
    }

    componentDidMount() {
        fetch(url, { headers }).then(response => response.json()).then((responseData) => {
            console.log("hola soy el response", responseData)
            document.getElementById("name").value = responseData.name;
            document.getElementById("proofType").value = responseData.proofType.name;
            document.getElementById("unitMeasure").value = responseData.unitMeasure.name;
            document.getElementById("rateMale").value = responseData.rateMale;
            document.getElementById("rateFemale").value = responseData.rateFemale;
            document.getElementById("description").value = responseData.description;
            this.setState({
                "name": responseData.name,
                "proofType": responseData.proofType.name,
                "unitMeasure": responseData.unitMeasure.name,
                "rateMale": responseData.rateMale,
                "rateFemale": responseData.rateFemale,
                "description": responseData.description
            })
            console.log(this.state)
        }).catch((error) => {
            console.log(error.message);
        })
    }

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { errors, ...noErrors } = this.state;
        const result = validate(noErrors);

        this.setState({ errors: result });

        if (!Object.keys(result).length) {
            delete this.state["errors"];
            axios
                .put(url, this.state, { headers: headers })
                .then((response) => {
                    window.location.href = "/dashboard/test";
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="w-full min-h-screen pl-20 pr-20 bg-auto object-fill back-image">
                <form className="mt-4">

                    <div className="z-0 mb-4 text-gray-700">
                        <span>Nombre de la Prueba</span>
                        <input
                            className="z-10 block w-full bg-white border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg focus:bg-red-50 "
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Nombre"
                            onChange={this.handleChange}
                            required
                        />
                        {errors.name && (
                            <span className="ml-3 text-md text-red" id="passwordHelp">
                                {errors.name}
                            </span>
                        )}
                    </div>

                    <div className="mb-4 text-gray-700">
                        <span> Tipo de Prueba </span>
                        <select
                            id="proofType"
                            name="proofType"
                            onChange={this.handleChange}
                            className="block w-full bg-white border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg focus:bg-red-50"
                            defaultValue="DEFAULT"
                            required
                        >
                            <option value="DEFAULT" disabled defaultValue>
                                Tipo
                            </option>
                            <option value="agility">agility</option>
                            <option value="speed">speed</option>
                            <option value="resistance">resistance</option>
                            <option value="catching">catching</option>
                            <option value="strength">strength</option>
                            <option value="jump">jump</option>
                            <option value="power">power</option>
                            <option value="other">other</option>
                        </select>
                        {errors.testType && (
                            <span className="ml-3 text-md text-red" id="passwordHelp">
                                {errors.testType}
                            </span>
                        )}
                    </div>

                    <div className="mb-4 text-gray-700">
                        <span> Unidad de medida </span>
                        <select
                            id="unitMeasure"
                            name="unitMeasure"
                            onChange={this.handleChange}
                            className="block w-full bg-white border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg focus:bg-red-50"
                            defaultValue="DEFAULT"
                            required
                        >
                            <option value="DEFAULT" disabled defaultValue>
                                Unidad
                            </option>
                            <option value="seconds">seconds</option>
                            <option value="meters">meters</option>
                            <option value="reps">reps</option>
                            <option value="other">other</option>
                        </select>
                        {errors.measurement && (
                            <span className="ml-3 text-md text-red" id="passwordHelp">
                                {errors.measurement}
                            </span>
                        )}
                    </div>


                    <div className="mb-4 text-gray-700">
                        <span>Estimación Equipo Masculino</span>
                        <input
                            type="number"
                            min="1"
                            max="300"
                            className="block w-full bg-white border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg focus:bg-red-50 "
                            placeholder="Estimación"
                            name="rateMale"
                            id="rateMale"
                            onChange={this.handleChange}
                            required
                        />
                        {errors.estimateM && (
                            <span className="ml-3 text-md text-red" id="passwordHelp">
                                {errors.estimateM}
                            </span>
                        )}
                    </div>

                    <div className="mb-4 text-gray-700">
                        <span>Estimación Equipo Femenino</span>
                        <input
                            type="number"
                            min="1"
                            max="300"
                            className="block w-full bg-white border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg focus:bg-red-50 "
                            placeholder="Estimación"
                            name="rateFemale"
                            id="rateFemale"
                            onChange={this.handleChange}
                            required
                        />
                        {errors.estimateF && (
                            <span className="ml-3 text-md text-red" id="passwordHelp">
                                {errors.estimateF}
                            </span>
                        )}
                    </div>

                    <div className="mb-4 text-gray-700">
                        <span>Descripción (Opcional)</span>
                        <textarea
                            type="text"
                            className="block w-full bg-white border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg focus:bg-red-50 "
                            placeholder="Descripción"
                            name="description"
                            id="description"
                            onChange={this.handleChange}
                            required
                        />
                        {errors.height && (
                            <span className="ml-3 text-md text-red" id="passwordHelp">
                                {errors.height}
                            </span>
                        )}
                    </div>
                </form>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        onClick={this.handleSubmit}
                        className="w-500 bg-black text-white rounded-full px-4 py-3"
                    >
                        <div className="mr-10 ml-20"></div>
                        EDITAR
                        <FontAwesomeIcon
                            className="flex-1 ml-5"
                            icon={["fas", "plus-circle"]}
                            size="1x"
                        />
                    </button>
                </div>
            </div>
        )
    }
}
