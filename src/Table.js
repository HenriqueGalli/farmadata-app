import React from "react";
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
    <table class="border-collapse border border-slate-400" {...getTableProps()} >
      <thead class="border border-slate-400">
        {headerGroups.map(headerGroup => (
          <tr class="border border-slate-400" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th class="border border-slate-400" {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody class="border border-slate-400"{...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr class="border border-slate-400"{...row.getRowProps()}>
              {row.cells.map(cell => {
                if(cell.column.id == "Id"){
                  return <td class="border border-slate-400" {...cell.getCellProps()} onClick = "excludeMed()" >Botão</td>;
                }
                else{
                  return <td class="border border-slate-400" {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                }
              })}
              
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function excludeMed(id){

}