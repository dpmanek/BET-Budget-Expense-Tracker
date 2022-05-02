import React, { useState, Fragment,useEffect } from "react";
import "./Createpage.css";
import axios from "axios";
import AuthService from '../../services/auth.service';
import "./backbutton.css";

const Createincome = () => {
  const [error, setErorr] = useState("");
  const [success, setSuccess] = useState("");
  
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    var data = AuthService.getCurrentUser()
    if(data){
     // setContent(data.user.userName);
      setAccessToken(data.accessToken);
    }
    else{
     // setContent("");
      setAccessToken(undefined);
    } 
  }, []);
  
  
  
  const addIncome = (event) => {
    setErorr("");
    setSuccess("");



    event.preventDefault();
    let data = event.target;
    let description = data[0].value;
    let amount = data[1].value;
    let category = data[2].value;
    let date = data[3].value;
    let recurringType = data[4].value;

    let body = {
      description,
      amount,
      category,
      date,
      recurringType,
    };

    axios
      .post("url", body)
      .then((data) => {
        setSuccess("Income added successfully !");
      })
      .catch((e) => {
        setErorr("Opps, something went wrong :(");
      });
  };
  return (
    <div>
      {accessToken !== undefined ? (
      <React.Fragment>
        <div>
        <a href="/dashboard">
    <button class="btn"  ><i class="fa fa-home"></i> Home</button>
    </a>
      <h1 className="page">Add Income</h1>
      <form className="place" onSubmit={addIncome}>
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
          <input
            type="number"
            placeholder="Amount"
            className="form-control position"
          />
        </div>
        <select
          className="form-select position"
          aria-label="Default select example"
        >
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
        <button type="submit" className="btn btn-primary" value="Submit">
          Submit
        </button>
        <div>{error != "" ? error : success}</div>
      </form>
    </div>
      </React.Fragment>):(<React.Fragment>
        <h1>Restricted area</h1>
        <h2><a href="/login">Sign In</a> to Access DashBoard</h2>
        </React.Fragment>)};
        </div>
    
  );
};

export default Createincome;
