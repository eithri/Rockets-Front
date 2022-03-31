import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "universal-cookie";
import "./EditPlay.css";
import S3FileUpload from "react-s3"


const cookies = new Cookies();
const url =
    "https://rocketsapi.herokuapp.com/api/play/" + cookies.get("id_jugada_editar");

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
    return errors;
}

const config = {
    bucketName: 'rocketsathmanbucket',
    dirName: 'playimages',
    region: 'us-east-1',
    accessKeyId: process.env.REACT_APP_S3_KEY_VALUE,
    secretAccessKey: process.env.REACT_APP_S3_PASS_VALUE
}

export default class EditPlay extends Component {

    uploadFile = (e) => {
        S3FileUpload.uploadFile(e.target.files[0], config)
            .then((data) => {
                this.setState({ "imgUrl": data.location });
                console.log(data.location);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    state = {
        errors: {
        }
    }

    componentDidMount() {
        fetch(url, { headers }).then(response => response.json()).then((responseData) => {
            console.log("cookies", cookies.get("id_jugada_editar"))
            console.log(responseData)
            document.getElementById("name").value = responseData.name;
            document.getElementById("imgUrl").src = responseData.imgUrl;
            document.getElementById("description").value = responseData.description;
            this.setState({
                "name": responseData.name,
                "proofType": responseData.imgUrl,
                "description": responseData.description
            })
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
                    window.location.href = "/dashboard/playbook";
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    };

    prueba = () => {
        console.log(cookies.get("id_jugada_editar"))
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="w-full min-h-screen pl-20 pr-20 bg-auto object-fill back-image">
                <form className="mt-4">

                    <div className="z-0 mb-4 text-gray-700">
                        <span>Nombre de la play</span>
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

                    <div className="z-0 mb-4 text-gray-700">
                        <span>Imagen</span>
                        <input
                            className="z-10 block w-full bg-white border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg focus:bg-red-50 "
                            type="file"
                            id="imgUrl"
                            name="imgUrl"
                            placeholder="Imagen"
                            onChange={this.uploadFile}
                            required
                        />
                        {errors.imgUrl && (
                            <span className="ml-3 text-md text-red" id="passwordHelp">
                                {errors.imgUrl}
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
                    </div>
                </form>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        onClick={this.handleSubmit}
                        className="w-500 bg-black text-white rounded-full px-4 py-3"
                    >
                        <div className="mr-10 ml-20"></div>
                        Editar
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
