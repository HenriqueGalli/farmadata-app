import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Form from "./Form";
import ListarEstoque from "./ListarEstoque";
import ListarMedicamento from "./ListarMedicamento";
import './App.css';

function App() {

  return (
    <Router>
      <div className="App">
        <div className="Menu">
        <Link className="MenuLink" to="/">Home</Link>
          <Link className="MenuLink"to="/cadastrarMedicamento">cadastrar</Link>
          <Link className="MenuLink" to="/listarMedicamento">listarMedicamento</Link>
          <Link className="MenuLink" to="/listarEstoque">Estoque</Link>
        </div>


        <Routes>
          <Route path="/cadastrarMedicamento" exact element={<Form  />}/>
          <Route path="/listarMedicamento" exact element={<ListarMedicamento />} />
          <Route path="/listarEstoque" exact element={<ListarEstoque />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;
