import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import numeral from "numeral";
import "./Manager.css";
import Pie from "../Graphs/piechart";
import UserService from "../../services/user.service";

export const Manager = ({ spendingTotal, expenseTotal }) => {
  let navigate = useNavigate();
  const redirectRoute = (path) => {
    navigate(path);
  };

  const formatTotal = numeral(expenseTotal / 100).format("$0,0.00");
  /*
  const [Name, setName] = useState("");
  const [DOB, setDOB] = useState("");

  useEffect(() => {
    UserService.getUserData().then((response) => {
      if (response) {
        if (response.data.FirstName) setName(response.data.FirstName);
        if (response.data.DOB) setDOB(response.data.DOB);
      } else {
        setName("");
        setDOB("");
      }
    });
  }, []);
  */

  return (
    <div className="row col-md-12 page">
      <div className="col-md-6">
        <h2 className="page-header__title">
          This month's expenses:
          <span>{formatTotal}</span>
        </h2>
        <div className="page-header__actions">
          <button
            className="btn btn-outline-success dash-success"
            type="button"
            onClick={() => redirectRoute("/addexpense")}
          >
            Add expenses
          </button>
        </div>
      </div>
      <div className="col-md-6">
        <h2 className="page-header__title">
          Spending Limit:
          <span>{formatTotal}</span>
        </h2>
        <div className="page-header__actions">
          <button
            className="btn btn-outline-success dash-success"
            type="button"
            onClick={() => redirectRoute("/addincome")}
          >
            Add income
          </button>
        </div>
      </div>
      <Pie />
      <div>
        <h4>
          To view a customized report on your expense, click on the button below
        </h4>
        <button
          className="btn btn-outline-success dash-success"
          type="button"
          onClick={() => redirectRoute("/report")}
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default Manager;
