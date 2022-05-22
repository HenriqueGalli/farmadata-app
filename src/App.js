import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Form from "./Form";
import Estoque from "./Estoque";
import ListarMedicamento from "./ListarMedicamento";

function App() {

  return (
    <Router>
      <div className="App">
        <h1>Home</h1>
        <Link to="/">Home</Link>
        <Link to="/cadastrarMedicamento">cadastrar</Link>
        <Link to="/listarMedicamento">listar</Link>
        <Link to="/estoque">Estoque</Link>

        <Routes>
          <Route path="/cadastrarMedicamento" exact element={<Form />}/>
          <Route path="/listarMedicamento" exact element={<ListarMedicamento />} />
          <Route path="/estoque" exact element={<Estoque />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;
