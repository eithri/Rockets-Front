import React from "react";
import axios from "axios";

export default function ModalForgetPassword() {

  const [showModal, setShowModal] = React.useState(false);
  const [inputMail, setInputMail] = React.useState('')

  const url = "https://rocketsapi.herokuapp.com/api/users/recoverPassword";

  function handleInput() {
    if (inputMail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputMail)) {
      axios.post(url, JSON.stringify(inputMail)).then(response => {
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      })
    } else {
      console.log("correo no válido");
    }
    setInputMail();
    setShowModal(false);
  }

  return (
    <>
      <button
        className="hover:text-red"
        type="button"
        onClick={() => setShowModal(true)}
      >
        ¿Olvidaste tu contraseña?
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Recuperar contraseña
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex flex-wrap justify-center">
                  <h1>Introduce un correo electrónico asociado para recuperar tu contraseña</h1>
                  <label className="custom-field">
                    <input
                      type="text"
                      name="mailImput"
                      onChange={event => setInputMail(event.target.value)}
                      className="mt-3"
                      required
                    />
                    <span className="placeholder">Correo electrónico</span>
                  </label>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>

                  <button
                    className="bg-red-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleInput()}
                  >
                    Solicitar contraseña
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

