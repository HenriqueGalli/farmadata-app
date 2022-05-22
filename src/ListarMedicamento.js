import React, { useState, useEffect, useMemo } from "react";
import Table from "./Table";
import axios from 'axios';

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
            Header: "Bula Remédio",
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
    <div className="ListarMedicamento">
      <Table columns={columns} data={data} />
    </div>
  );

}

export default ListarMedicamento;
