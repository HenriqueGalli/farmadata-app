import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import { useTable } from "react-table";
import { Button } from "bootstrap";
import ReactForm from "./Form";

export default function Table({ columns, data, type }) {

  // Use the useTable Hook to send the columns and data to build the table
  const {
    props,
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data,
    type
  });

  const tableType = type;
  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <div>
      
      <table className="border-collapse border border-slate-400" {...getTableProps()} >
        <thead className="border border-slate-400">
          {headerGroups.map(headerGroup => (
            <tr className="border border-slate-400" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className="border border-slate-400" {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="border border-slate-400"{...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            if(tableType === "medicamento"){
              return (
                <tr className="border border-slate-400"{...row.getRowProps()}>
                  {row.cells.map(cell => {
                    if (cell.column.id === "Id") {
                      return <td className="border border-slate-400" {...cell.getCellProps()} >
                        <div>
                          <button onClick={() => deleteMedicamento(cell.row.original.Id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                            </svg>
                          </button>
                          <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brush" viewBox="0 0 16 16">
                              <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z"/>
                            </svg>
                          </button>
                        </div>
                      </td>;
                    } else {
                      return <td className="border border-slate-400" {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    }
                  })}
  
                </tr>
              );
            } else if(tableType === "estoque"){
              return (
                <tr className="border border-slate-400"{...row.getRowProps()}>
                  {row.cells.map(cell => {
                    if (cell.column.id === "Id") {
                      return <td className="border border-slate-400" {...cell.getCellProps()} >
                        <div>
                          <button onClick={() => editEstoque(cell.row.original.Id, cell.row.original.Quantidade, cell.row.original.NomeComercial)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brush" viewBox="0 0 16 16">
                              <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z"/>
                            </svg>
                          </button>
                        </div>
                      </td>;
                    } else {
                      return <td className="border border-slate-400" {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    }
                  })}
  
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}

function deleteMedicamento(id) {
  axios.delete('http://localhost:8080/api/medicamento', {
    params: {
      Id: id
    }
  });

  window.location.reload()
}

function editEstoque(id, quantidade, nomeComercial) {
  // axios.put('http://localhost:8080/api/estoque', {
  //   params: {
  //     Id: id,
  //     Quantidade: quantidade, 
  //     NomeComercial: nomeComercial
  //   }
  // });

  axios.put('http://localhost:8080/api/estoque', {
        "Id": id,
        "Quantidade": quantidade,
        "NomeComercial": nomeComercial
    },{
      headers: {
        'content-type': 'text/json'
      }
    });

  //window.location.reload()
}