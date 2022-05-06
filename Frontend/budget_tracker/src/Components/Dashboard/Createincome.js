import React, { useState, Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Createpage.css";
import axios from "axios";
import AuthService from "../../services/auth.service";
import "./backbutton.css";
import transactionService from "../../services/add.transaction";

const Createincome = () => {
  let navigate = useNavigate();

  //validation
  const initialValues = {
    name: "",
    description: "",
    amount: "",
    category: "",
    date: "",
    recurringType: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  //

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    var data = AuthService.getCurrentUser();
    if (data) {
      // setContent(data.user.userName);
      setAccessToken(data.accessToken);
    } else {
      // setContent("");
      setAccessToken(undefined);
    }

    let tmp = window.location.href.split("?");
    if (tmp.length > 1) {
      let id = tmp[1].split("=")[1];
      axios
        .get("")
        .then((data) => {
          setFormValues(data.data);
        })
        .catch((e) => {});
    }
  }, []);

  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // }, [formErrors]);

  const validate = (values) => {
    const alpha = /^[0-9]+$/;
    const errors = {};
    if (!values.amount) {
      errors.amount = "Amount is required";
    }
    if (!values.name) {
      errors.name = "Name is required";
    }
    const flag = alpha.test(values.name);
    if (flag == true) {
      errors.name = "Name cannot be just Numerical!";
    }
    if (!values.category) {
      errors.category = "Category is required";
    }
    if (Object.keys(errors).length === 0) {
      return null;
    }
    return errors;
  };

  const addIncome = async (event) => {
    setError("");
    setSuccess("");
    event.preventDefault();
    await setFormErrors(await validate(formValues));
    setIsSubmit(true);
    if (Object.keys(formErrors).length == 0) {
      await transactionService
        .postUserIncome(formValues)
        .then((data) => {
          console.log(data, "====================");
          setSuccess("Income added successfully!!");
          navigate("/dashboard");
        })
        .catch((e) => {
          setError("Opps, something went wrong :(");
        });
    }
  };

  return (
    <div>
      {accessToken !== undefined ? (
        <React.Fragment>
          <div className="row col-md-8 offset-md-4">
            <a href="/dashboard">
              <button class="btn">
                <i class="fa fa-home"></i> Home
              </button>
            </a>
            <h1 className="">Add Income</h1>
            <form className="" onSubmit={addIncome}>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="form-control position"
                  value={formValues.name}
                  onChange={handleChange}
                />
              </div>
              <p>{formErrors ? formErrors.name : ""}</p>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="form-control position"
                  value={formValues.description}
                  onChange={handleChange}
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
                  name="amount"
                  value={formValues.amount}
                  onChange={handleChange}
                />
              </div>
              <p>{formErrors ? formErrors.amount : ""}</p>
              <label for="exampleInputEmail1" className="form-label">
                Category
              </label>
              <select
                className="form-select position"
                aria-label="Default select example"
                name="category"
                value={formValues.category}
                onChange={handleChange}
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
              <p>{formErrors ? formErrors.category : ""}</p>
              <div className="mb-3 position">
                <label for="date" class="col-form-label">
                  Date
                </label>
                <div class="input-group date position" id="datepicker">
                  <input
                    type="date"
                    class="form-control"
                    id="date"
                    name="date"
                    value={formValues.date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <p>{formErrors ? formErrors.date : ""}</p>
              Is this a reccuring income?
              <div class="form-check ">
                <input
                  class="form-check-input des"
                  type="radio"
                  id="flexRadioDefault1"
                  value="yes"
                  name="recurringType"
                  onChange={handleChange}
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Yes
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input des"
                  type="radio"
                  id="flexRadioDefault2"
                  value="no"
                  name="recurringType"
                  onChange={handleChange}
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  No
                </label>
              </div>
              <button type="submit" className="btn btn-primary" value="Submit">
                Submit
              </button>
              <div>{error != "" ? error : success}</div>
            </form>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h1>Restricted area</h1>
          <h2>
            <a href="/login">Sign In</a> to Access DashBoard
          </h2>
        </React.Fragment>
      )}
    </div>
  );
};

export default Createincome;
