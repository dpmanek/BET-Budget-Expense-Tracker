import React, { useState, useEffect } from "react";
import axios from "axios";
import mockData from "./mockData.json";
import UserService from "../../services/user.service";
import transactionService from "../../services/add.transaction";

const ExpenseTable = () => {
  const [data, setdata] = useState([]);
  const [oneTime, setOneTime] = useState([]);
  const [toggleTable, setToggleTable] = useState("OneTime");

  useEffect(() => {
    UserService.getUserTransactionData().then((response) => {
      if (response.data) {
        setdata(response.data.Expenditure.OneTime);
        setOneTime(response.data.Expenditure.Recurring);
      }
    });
  }, []);

  const handleEdit = (event) => {
    event.preventDefault();
    let val = event.target.value;
    window.location.href = "/addexpense?q=" + val;
  };

  const handleDelete = (event) => {
    event.preventDefault();
    let id = event.target.value;

    transactionService
      .deleteUserExpense(id)
      .then((d) => {
        let tmpData = data.filter((d) => d._id != id);
        let one = oneTime.filter((d) => d._id != id);
        setOneTime(one);
        setdata(tmpData);
      })
      .catch((e) => {
        console.log("Error");
      });
  };

  const changeExpense = (event) => {
    event.preventDefault();
    setToggleTable(event.target.value);
  };

  return (
    <div>
      <select
        className="form-select position"
        aria-label="Default select example"
        name="expenseType"
        onChange={changeExpense}
      >
        <option selected value="OneTime">
          One Time
        </option>
        <option value="Recurring">Recurring</option>
      </select>
      {toggleTable != "OneTime" ? (
        <React.Fragment>
          <table className="table table-border">
            <thead>
              <th>Expense Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </thead>
            <tbody>
              {oneTime.map((d) => {
                return (
                  <tr>
                    <td>{d.Name}</td>
                    <td>{d.Amount}</td>
                    <td>{d.TranactionDate}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        value={d._id}
                        onClick={handleEdit}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        value={d._id}
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <table className="table table-border">
            <thead>
              <th>Expense Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </thead>
            <tbody>
              {data.map((d) => {
                return (
                  <tr>
                    <td>{d.Name}</td>
                    <td>{d.Amount}</td>
                    <td>{d.TranactionDate}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        value={d._id}
                        onClick={handleEdit}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        value={d._id}
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </React.Fragment>
      )}
    </div>
  );
};

export default ExpenseTable;
