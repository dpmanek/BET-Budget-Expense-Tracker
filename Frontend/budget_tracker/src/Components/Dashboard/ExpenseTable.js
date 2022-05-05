import React, { useState, useEffect } from "react";
import axios from "axios";
import mockData from "./mockData.json";
import UserService from "../../services/user.service";

const ExpenseTable = () => {
  const [data, setdata] = useState([]);
  /*
  useEffect(() => {
    setdata(mockData);
    console.log(data);
  });
  */

  // use this to get all user data  create required states
  useEffect(() => {
    // const fetchData = async () => {
    //   const data = await UserService.getUserTransactionData();
    //   console.log(data);
    // };
    // fetchData().catch("nirAv-----", console.error);
    UserService.getUserTransactionData().then((response) => {
      console.log(response, "---------");
      console.log(response.data.Expenditure, "============");
      if (response) {
        setdata(response.data.Expenditure.OneTime);
      } else {
        console.log("No response", "=============");
      }
    });
  }, []);

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
                <td>{d.Name}</td>
                <td>{d.Amount}</td>
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
