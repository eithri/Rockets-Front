import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "universal-cookie";
import "./EditPlayer.css";

const cookies = new Cookies();
const url =
  "https://rocketsapi.herokuapp.com/api/players/" + cookies.get("playerEditID");

const headers = {
  "Content-Type": "application/json",
  "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjNiYzYwOGFlOGIxOThmMTQ1YTk1NyIsImlhdCI6MTYzMzkyNjY2MCwiZXhwIjoxNjM0MDEzMDYwfQ.0BmY70j9SDhncRsdUnXmKqDEuhJ0QsN40OWS_ImEF74"
};

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Campo obligatorio";
  } else if (values.name.length > 100) {
    errors.name = "El nombre debe tener menos de 100 caracteres";
  }

  if (!values.phone) {
    errors.phone = "Campo obligatorio";
  } else if (!/^[0-9]+$/.test(values.phone)) {
    errors.phone = "El teléfono debe ser de tipo numérico";
  } else if (values.phone.length !== 10) {
    errors.phone = "El teléfono debe tener 10 caracteres";
  }
  if (!values.lastName) {
    errors.lastName = "Campo obligatorio";
  } else if (values.lastName.length > 100) {
    errors.lastName = "El apellido debe tener menos de 100 caracteres";
  }
  if (!values.address) {
    errors.address = "Campo obligatorio";
  } else if (values.address.length > 100) {
    errors.address = "La dirección debe tener menos de 100 caracteres";
  }
  if (!values.gender) {
    errors.gender = "Se debe escoger una opción";
  }
  if (!values.position) {
    errors.position = "Se debe escoger una opción";
  }

  const actualDate = new Date();
  const selectedDate = Date.parse(values.birthday);
  if (!values.birthday) {
    errors.birthday = "Campo obligatorio";
  } else if (selectedDate > actualDate) {
    errors.birthday = "Fecha no válida";
  }

  const heightFloat = parseInt(values.height);
  if (!values.height) {
    errors.height = "Campo obligatorio";
  } else if (heightFloat > 300 || heightFloat < 1) {
    errors.height = "La estatura debe ser menor de 300 cm";
  }
  if (!values.email) {
    errors.email = "Campo obligatorio";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Correo no válido";
  }

  const weightFloat = parseFloat(values.weight);
  if (!values.weight) {
    errors.weight = 'Campo obligatorio';
  } else if (weightFloat > 500 || weightFloat < 1) {
    errors.weight = 'El peso debe ser menor de 500 kg';
  }

  if (!values.documentId) {
    errors.documentId = "Campo obligatorio";
  } else if (values.documentId.length > 100) {
    errors.documentId = "El documento debe tener menos de 100 caracteres";
  }
  if (!values.eps) {
    errors.eps = "Campo obligatorio";
  } else if (values.eps.length > 100) {
    errors.eps = "La eps debe tener menos de 100 caracteres";
  }
  return errors;
};

export default class registerPlayer extends Component {
  state = {
    errors: {},
  };

  componentDidMount() {
    fetch(url, { headers })
      .then(response => response.json())
      .then((responseData) => {
        document.getElementById("name").value = responseData.name;
        document.getElementById("phone").value = responseData.phone;
        document.getElementById("lastName").value = responseData.lastName;
        document.getElementById("address").value = responseData.address;
        document.getElementById("gender").value = responseData.gender;
        document.getElementById("email").value = responseData.user.email;
        document.getElementById("position").value = responseData.position;
        document.getElementById("birthday").value = responseData.birthday;
        document.getElementById("height").value = responseData.height;
        document.getElementById("weight").value = responseData.weight;
        document.getElementById("documentId").value = responseData.documentId;
        document.getElementById("eps").value = responseData.eps;
        this.setState({
          "name": responseData.name,
          "phone": responseData.phone,
          "lastName": responseData.lastName,
          "address": responseData.address,
          "gender": responseData.gender,
          "email": responseData.user.email,
          "position": responseData.position,
          "birthday": responseData.birthday,
          "height": responseData.height,
          "weight": responseData.weight,
          "documentId": responseData.documentId,
          "eps": responseData.eps
        })
      }).catch((error) => {
        console.log(error.message);
      });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

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
          window.location.href = "./";
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
        <div className="flex items-center ">
          <FontAwesomeIcon
            className="flex-1 text-red-700 mb-7 mt-5"
            icon={["fas", "user-plus"]}
            size="8x"
          />
        </div>

        <form>
          <div className="grid grid-cols-2 gap-x-10">
            <div className="z-0 mb-4 text-gray-700">
              <span>Nombre</span>
              <input
                className="z-10 block w-full bg-white border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg focus:bg-red-50 "
                type="text"
                id="name"
                name="name"
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
              <span>Teléfono</span>
              <input
                className="block w-full bg-white border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg focus:bg-red-50 "
                type="text"
                placeholder="Teléfono"
                name="phone"
                id="phone"
                onChange={this.handleChange}
                required
              />
              {errors.phone && (
                <span className="ml-3 text-md text-red" id="passwordHelp">
                  {errors.phone}
                </span>
              )}
            </div>

            <div className="mb-4 text-gray-700">
              <span>Apellido</span>
              <input
                className="block w-full bg-white border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg focus:bg-red-50 "
                type="text"
                placeholder="Apellido"
                name="lastName"
                id="lastName"
                onChange={this.handleChange}
                required
              />
              {errors.lastname && (
                <span className="ml-3 text-md text-red" id="passwordHelp">
                  {errors.lastname}
                </span>
              )}
            </div>

            <div className="mb-4 text-gray-700">
              <span>Dirección</span>
              <input
                className="block w-full bg-white border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg focus:bg-red-50 "
                type="text"
                placeholder="Dirección"
                name="address"
                id="address"
                onChange={this.handleChange}
                required
              />
              {errors.address && (
                <span className="ml-3 text-md text-red" id="passwordHelp">
                  {errors.address}
                </span>
              )}
            </div>

            <div className="mb-4 text-gray-700">
              <span>Género</span>
              <select
                name="gender"
                id="gender"
                onChange={this.handleChange}
                className="block w-full bg-white border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg focus:bg-red-50"
                required
              >
                <option value="DEFAULT" disabled defaultValue>
                  Género:
                </option>
                <option value="Male">Masculino</option>
                <option value="Female">Femenino</option>
              </select>
              {errors.gender && (
                <span className="ml-3 text-md text-red" id="passwordHelp">
                  {errors.gender}
                </span>
              )}
            </div>

            <div className="mb-4 text-gray-700">
              <span>Posición</span>
              <select
                id="position"
                name="position"
                onChange={this.handleChange}
                className="block w-full bg-white border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg focus:bg-red-50 "
                required
              >
                <option value="DEFAULT" disabled defaultValue>
                  Posición:
                </option>
                <option value="QB">QB</option>
                <option value="RB">RB</option>
                <option value="LB">LB</option>
                <option value="WR">WR</option>
                <option value="S">S</option>
                <option value="CB">CB</option>
                <option value="C">C</option>
              </select>
              {errors.position && (
                <span className="ml-3 text-md text-red" id="passwordHelp">
                  {errors.position}
                </span>
              )}
            </div>

            <div className="mb-4 text-gray-700">
              <span>Fecha de nacimiento</span>
              <input
                id="birthday"
                type="Date"
                className="block w-full bg-white border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg focus:bg-red-50 "
                name="birthday"
                onChange={this.handleChange}
                required
              />
              {errors.birthday && (
                <span className="ml-3 text-md text-red" id="passwordHelp">
                  {errors.birthday}
                </span>
              )}
            </div>

            <div className="mb-4 text-gray-700">
              <span>Estatura (cm)</span>
              <input
                type="number"
                min="1"
                max="300"
                className="block w-full bg-white border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg focus:bg-red-50 "
                placeholder="Estatura (cm)"
                name="height"
                id="height"
                onChange={this.handleChange}
                required
              />
              {errors.height && (
                <span className="ml-3 text-md text-red" id="passwordHelp">
                  {errors.height}
                </span>
              )}
            </div>

            <div className="mb-4 text-gray-700">
              <span>
                <FontAwesomeIcon
                  className="flex-1 text-black mx-2"
                  icon={["fas", "lock"]}
                />
                Correo Electrónico
              </span>
              <input
                type="text"
                className="block w-full flex-auto bg-grayLi border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg focus:bg-red-50 "
                placeholder="Correo electrónico"
                name="email"
                id="email"
                onChange={this.handleChange}
                required
                disabled
              />
              {errors.email && (
                <span className="ml-3 text-md text-red" id="passwordHelp">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="mb-4 text-gray-700">
              <span>Peso (kg)</span>
              <input
                type="number"
                min="1"
                className="block w-full bg-white border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg focus:bg-red-50 "
                placeholder="Peso (kg)"
                name="weight"
                id="weight"
                onChange={this.handleChange}
                required
              />
              {errors.weight && (
                <span className="ml-3 text-md text-red" id="passwordHelp">
                  {errors.weight}
                </span>
              )}
            </div>

            <div className="mb-4 text-gray-700">
              <span>
                {" "}
                <FontAwesomeIcon
                  className="flex-1 text-black mx-2"
                  icon={["fas", "lock"]}
                />{" "}
                Documento de Identidad
              </span>
              <input
                type="text"
                className="block w-full bg-grayLi border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg focus:bg-red-50 "
                placeholder="Documento de identidad"
                name="documentId"
                id="documentId"
                onChange={this.handleChange}
                required
                disabled
              />
              {errors.documentId && (
                <span className="ml-3 text-md text-red" id="passwordHelp">
                  {errors.documentId}
                </span>
              )}
            </div>

            <div className="mb-4 text-gray-700">
              <span>Eps</span>
              <input
                type="text"
                className="block w-full bg-white border-2 border-black rounded py-2 px-4 placeholder-gray-500 text-black text-lg focus:bg-red-50 "
                placeholder="EPS"
                name="eps"
                id="eps"
                onChange={this.handleChange}
                required
              />
              {errors.eps && (
                <span className="ml-3 text-md text-red" id="passwordHelp">
                  {errors.eps}
                </span>
              )}
            </div>
          </div>
        </form>

        <div className="flex justify-end">
          <button
            type="submit"
            onClick={this.handleSubmit}
            className="w-500 bg-black text-white rounded-full px-4 py-3"
          >
            <div className="mr-10 ml-20"></div>
            Registrar
            <FontAwesomeIcon
              className="flex-1 ml-5"
              icon={["fas", "user-check"]}
              size="1x"
            />
          </button>
        </div>
      </div>
    );
  }
}
