import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import { useTable } from "react-table";

export default function Table({ columns, data }) {

  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data
  });
  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
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
          return (
            <tr className="border border-slate-400"{...row.getRowProps()}>
              {row.cells.map(cell => {
                if(cell.column.id === "Id"){
                  return <td className="border border-slate-400" {...cell.getCellProps()} >
                    <div>
                      <button onClick={()=>deleteMedicamento(cell.row.original.Id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                      </button>
                    </div>
                  </td>;
                }
                else{
                  return <td className="border border-slate-400" {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                }
              })}
              
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function deleteMedicamento(id){
  axios.delete('http://localhost:8080/api/medicamento', {
    params: {
      Id: id
    }
  });
  window.location.reload()
}