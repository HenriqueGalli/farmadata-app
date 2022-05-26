import React, { useState, useEffect, useMemo } from "react";
import Table from "./Table";
import axios from 'axios';
import "./ListarMedicamento.css"

function ListarMedicamento() {

  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:8080/api/medicamento");
      setData(result.data);
    })();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Medicamentos",
        // First group columns
        columns: [
          {
            Header: "Nome Comercial",
            accessor: "NomeComercial"
          },
          {
            Header: "Fabricante",
            accessor: "Fabricante"
          },  
          {
            Header: "Nome Generico",
            accessor: "NomeGenerico"
          },  
          {
            Header: "Bula",
            accessor: "BulaRemedio"
          },  
          {
            Header: "Valor",
            accessor: "Valor"
          },
          {
            Header: "Ação",
            accessor: "Id"
          }

        ]
      },
    ],
    []
  );

  return (
    <div className="ListarTabela">
      <Table columns={columns} data={data} type={"medicamento"}/>
    </div>
  );

}

export default ListarMedicamento;
