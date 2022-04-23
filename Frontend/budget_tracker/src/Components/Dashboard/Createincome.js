import React from "react";
import "./Createpage.css";

const Createincome = () => {
  return (
    <div>
      <h1 className="page">Add Income</h1>
      <form className="place">
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
          <option value="Checks">Checks</option>
          <option value="Coupons">Coupons</option>
          <option value="Dues">Dues</option>
          <option value="Grants">Grants</option>
          <option value="Gifts">Gifts</option>
          <option value="Interests">Interests</option>
          <option value="Dividends">Dividends</option>
          <option value="Lending">Lending</option>
          <option value="Renting">Renting</option>
          <option value="Lottery">Lottery</option>
          <option value="Refunds">Refunds</option>
          <option value="IT-Return">IT Return</option>
          <option value="Sale">Sale</option>
          <option value="Salary">Salary</option>
          <option value="Other">Other</option>
        </select>
        <div className="mb-3">
          <label for="date" className="col-form-label">
            Date
          </label>
          <div className="input-group date position" id="datepicker">
            <input type="date" className="form-control " id="date" />
            <span className="input-group-append">
              <span className="input-group-text bg-light d-block"></span>
            </span>
          </div>
        </div>
        Is this a reccuring income?
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label className="form-check-label" for="flexRadioDefault1">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            checked
          />
          <label className="form-check-label" for="flexRadioDefault2">
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

export default Createincome;
