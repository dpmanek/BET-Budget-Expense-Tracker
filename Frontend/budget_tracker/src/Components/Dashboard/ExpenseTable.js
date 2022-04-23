import React, { useState, useEffect } from "react";
import axios from "axios";
import mockData from "./mockData.json";

const ExpenseTable = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    setdata(mockData);
    console.log(data);
  });

  const handleEdit = (event) => {
    event.preventDefault();
    let val = event.target.value;
    let d = JSON.parse(val);
    window.location.href = "/edit?";
  };

  return (
    <div>
      <table className="table table-border">
        <thead>
          <th>Expense Name</th>
          <th>Amount</th>
          <th>Edit</th>
        </thead>
        <tbody>
          {data.map((d) => {
            return (
              <tr>
                <td>{d.expenseName}</td>
                <td>{d.expenseAmount}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    value={JSON.stringify(d)}
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
