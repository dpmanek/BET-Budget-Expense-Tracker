import React from "react";
import "./Createpage.css";

const Createincome = () => {
  return (
    <div>
      <h1 className="page">Add Income</h1>
      <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Description
          </label>
          <input
            type="text"
            placeholder="Description"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Amount
          </label>
          <input type="number" placeholder="Amount" className="form-control" />
        </div>
        <select className="form-select" aria-label="Default select example">
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
          <label for="date" class="col-1 col-form-label">
            Date
          </label>
          <div class="input-group date" id="datepicker">
            <input type="date" class="form-control" id="date" />
            <span class="input-group-append">
              <span class="input-group-text bg-light d-block"></span>
            </span>
          </div>
        </div>
        Is this a reccuring income?
        <div class="form-check">
          <input
            class="form-check-input"
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
            class="form-check-input"
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

export default Createincome;
