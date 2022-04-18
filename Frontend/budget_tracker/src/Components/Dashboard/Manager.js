import React from "react";
import { Link, useNavigate } from "react-router-dom";
import numeral from "numeral";
import "./Manager.css";
import Pie from "../Graphs/piechart";

export const Manager = ({ spendingTotal, expenseTotal }) => {
  let navigate = useNavigate();
  const redirectRoute = (path) => {
    navigate(path);
  };
  const formatTotal = numeral(expenseTotal / 100).format("$0,0.00");
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
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search expenses"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Manager;
