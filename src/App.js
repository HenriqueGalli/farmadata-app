import React, { useState, useEffect, useMemo } from "react";
import Table from "./Table";
import ReactForm from "./Form";
import axios from 'axios';

function App() {

  const [data, setData] = useState([]);
  const [state, setState] = useState('table-medicamento')
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
    <div className="App">
      {state === 'add-medicamento' && <ReactForm    />}
      {state === 'table-medicamento' &&  <Table columns={columns} data={data}/>}
    </div> 
  );

}

export default App;
