import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import numeral from "numeral";
import "./Manager.css";
import Pie from "../Graphs/piechart";
import UserService from "../../services/user.service";

export const Manager = ({ spendingTotal, expenseTotal, reloader }) => {
  let navigate = useNavigate();
  const redirectRoute = (path) => {
    navigate(path);
  };

  console.log("rendering Manager");

  //const formatTotal = numeral(expenseTotal / 100).format("$0,0.00");

  const [SpendingLimit, setSpendingLimit] = useState("");
  const [MonthExpense, setMonthExpense] = useState("");

  useEffect(() => {
    UserService.getSpendingLimitAndMonthExpense().then((response) => {
      if (response) {
        if (response.data.SpendingLimit)
          setSpendingLimit(`$${response.data.SpendingLimit}`);
        if (response.data.CurrentMonthExpenses)
          setMonthExpense(`$${response.data.CurrentMonthExpenses}`);
      } else {
        setSpendingLimit("");
        setMonthExpense("");
      }
    });
  }, []);

  return (
    <div className="row col-md-12 page">
      <div className="col-md-6">
        <h2 className="page-header__title">
          This month's expenses:
          <span>{MonthExpense}</span>
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
          <span>{SpendingLimit}</span>
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
      <Pie reloader={reloader} />
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
      <div>
        <h4>
          To view monthly comaprison of your expenses, click on the button below
        </h4>
        <button
          className="btn btn-outline-success dash-success"
          type="button"
          onClick={() => redirectRoute("/report")}
        >
          Monthly Comparison
        </button>
      </div>
    </div>
  );
};

export default Manager;
