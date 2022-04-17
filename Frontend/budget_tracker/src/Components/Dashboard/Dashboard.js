import React from "react";
import { Link, useNavigate } from "react-router-dom";
import numeral from "numeral";

export const Dashboard = ({ spendingTotal, expenseTotal }) => {
  let navigate = useNavigate();
  const redirectRoute = (path) => {
    navigate(path);
  };
  const formatTotal = numeral(expenseTotal / 100).format("$0,0.00");
  return (
    <div className="page-header">
      <div className="content-container-expense">
        <h2 className="page-header__title">
          This month's expenses:
          <span>{formatTotal}</span>
        </h2>
        <div className="page-header__actions">
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={() => redirectRoute("/addexpense")}
          >
            Add expenses
          </button>
        </div>
      </div>
      <div className="content-container-income">
        <h2 className="page-header__title">
          Spending Limit:
          <span>{formatTotal}</span>
        </h2>
        <div className="page-header__actions">
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={() => redirectRoute("/addincome")}
          >
            Add income
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
