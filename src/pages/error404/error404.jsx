import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header";

export default function Error404() {
  return (
    <div className="error404 w-full mx-20">
      <Header />
      <h1>Error404</h1>
      <h2>Página no encontrada</h2>
      <Link to="/">
        <h3>Volver al inicio</h3>
      </Link>
    </div>
  );
}
