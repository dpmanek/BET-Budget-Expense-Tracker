import React from "react";
import "./Createpage.css";

const Createexpense = () => {
  return (
    <div>
      <h1 className="page">Add Expense</h1>
      <form class="place">
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Description
          </label>
          <input
            type="text"
            placeholder="Description"
            className="form-control position"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Amount
          </label>
          <input type="number" placeholder="Amount" className="form-control position" />
        </div>
        <select className="form-select position" aria-label="Default select example">
          <option selected>Select your category</option>
          <option value="Food and Drinks">Food and Drinks</option>
          <option value="Shopping">Shopping</option>
          <option value="Housing">Housing</option>
          <option value="Transorpation">Transorpation</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Life and Entertainment">Life and Entertainment</option>
          <option value="Communication and PC">Communication and PC</option>
          <option value="Financial Expenses">Financial Expenses</option>
          <option value="Investments">Investments</option>
          <option value="Others">Others</option>
          <option value="Missing">Missing</option>
        </select>
        <div className="mb-3 position">
          <label for="date" class="col-form-label">
            Date
          </label>
          <div class="input-group date position" id="datepicker">
            <input type="date" class="form-control" id="date" />
            <span class="input-group-append ">
              <span class="input-group-text bg-light d-block "></span>
            </span>
          </div>
        </div>
        <select className="form-select position" aria-label="Default select example">
          <option selected>Select an account</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash">Cash</option>
        </select>
        Is this a reccuring expense?
        <div class="form-check ">
          <input
            class="form-check-input des"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Yes
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input des"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            checked
          />
          <label class="form-check-label" for="flexRadioDefault2">
            No
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Createexpense;
