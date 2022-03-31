import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";
import ModalForgetPassword from "../../components/ModalForgetPassword/ModalForgetPassword";
import "./login.css";
import "dotenv/config";

const cookies = new Cookies();

const instance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Campo obligatorio';
  }
  if (!values.password) {
    errors.password = 'Campo obligatorio';
  }
  return errors;
}

const { BACKEND_SITE } = process.env
const baseUrl = BACKEND_SITE+"/api/auth/signin";

export default class Login extends Component {



  state = {
    form: {
      email: "",
      password: "",
    },
  };

  handleChange = async (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  iniciarSesion = async () => {

    const { errors, ...noErrors } = this.state;
    const result = validate(noErrors);

    this.setState({ errors: result })

    await instance
      .post(baseUrl, {
        email: this.state.form.email,
        password: this.state.form.password,
      })
      .then((response) => {
        if (response.data.token) {
          delete this.state['errors'];
          const decoded = jwt.verify(response.data.token, "players-api");
          console.log(decoded);
          cookies.set("token", response.data.token);
          cookies.set("email", this.state.form.email);
          alert(`Bienvenido!`);
          window.location.href = "./dashboard";
        } else {
          alert("Usuario o contraseña incorrectos");
        }
      })
      .catch((error) => {
        alert('Usuario o contraseña no válidos');
        console.log(error);
      });
  };

  render() {

    const { errors } = this.state;
    return (
      <div className="w-full min-h-screen p-14 bg-no-repeat bg-cover Back-image">
        <div className="flex flex-col bg-white m-20 p-12 rounded-3xl items-center">
          <img
            className="w-48"
            src="https://i.ibb.co/M1MbSvC/ROCKETS-LOGO.png"
            alt="logo Rockets Athman"
          />
          <label className="custom-field one ">
            <input
              type="text"
              name="email"
              id="email"
              required
              onChange={this.handleChange}
            />
            <span className="placeholder">Usuario</span>

          </label>
          <label className="custom-field one ">
            <input
              type="password"
              name="password"
              id='password'
              required
              onChange={this.handleChange}
            />
            <span className="placeholder">Contraseña</span>
          </label>
          <button
            type="button"
            onClick={() => this.iniciarSesion()}
            className="mr-3 my-2 bg-red-dark font-semibold text-white rounded-3xl px-3 py-1 border-2 border-red-dark shadow hover:shadow-lg"
          >
            Ingresar
            <FontAwesomeIcon
              className="flex-1 ml-1"
              icon={["fas", "external-link-alt"]}
              size="1x"
            />
          </button>
          <ModalForgetPassword />
        </div>
      </div>
    );
  }
}
