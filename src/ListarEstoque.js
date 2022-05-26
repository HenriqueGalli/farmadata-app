import React, { useState, useEffect, useMemo } from "react";
import Table from "./Table";
import axios from 'axios';
import "./ListarMedicamento.css"

function ListarEstoque() {

  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:8080/api/estoque");
      setData(result.data);
    })();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Estoque",
        // First group columns
        columns: [
          {
            Header: "Nome Comercial",
            accessor: "NomeComercial"
          },
          {
            Header: "Quantidade",
            accessor: "Quantidade"
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
      <Table columns={columns} data={data} type={"estoque"}/>
    </div>
  );

}

export default ListarEstoque;
