import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Form from "./Form";
import ListarEstoque from "./ListarEstoque";
import ListarMedicamento from "./ListarMedicamento";
import './App.css';
import Sobre from "./Sobre";

function App() {

  return (
    <Router>
      <div className="App">
        <div className="Menu">
          <Link className="MenuLink"to="/cadastrarMedicamento">Cadastrar</Link>
          <Link className="MenuLink" to="/">Listar Medicamento</Link>
          <Link className="MenuLink" to="/listarEstoque">Estoque</Link>
          <Link className="MenuLink" to="/sobre">Sobre</Link>

        </div>


        <Routes>
          <Route path="/sobre" exact element={<Sobre  />}/>
          <Route path="/cadastrarMedicamento" exact element={<Form  />}/>
          <Route path="/" exact element={<ListarMedicamento />} />
          <Route path="/listarEstoque" exact element={<ListarEstoque />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;
