import React, { useState, Fragment, useEffect } from "react";
import { Link,useNavigate} from "react-router-dom";
import "./Createpage.css";
import axios from "axios";
import AuthService from "../../services/auth.service";
import "./backbutton.css";
import transactionService from "../../services/add.transaction";

const Createexpense = () => {
  let navigate = useNavigate();
  
  //validation
  const initialValues = {
    name: "",
    description: "",
    amount: "",
    category: "",
    date: "",
    accountType: "",
    recurringType: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  //

  const [error, setErorr] = useState("");
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
  }, []);

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const alpha = /^[0-9]+$/;
    const errors = {};
    if (!values.amount) {
      errors.amount = "Amount is required";
    }
    if (!values.name) {
      errors.name = "Name is required";
    }
    const flag = alpha.test(values.description);
    if (flag == true) {
      errors.name = "Name cannot be just Numerical!";
    }
    if (!values.category) {
      errors.category = "Category is required";
    }
    if (!values.date) {
      errors.date = "Date is required";
    }
    if (!values.accountType) {
      errors.accountType = "Type of the Account is required";
    }
    return errors;
  };

  const addExpenses = (event) => {
    setErorr("");
    setSuccess("");
    console.log(event);
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    let data = event.target;
    let name = data[0].value;
    let description = data[1].value;
    let amount = data[2].value;
    let category = data[3].value;
    let date = data[4].value;
    let accountType = data[5].value;
    let recurringType = data[6].value;

    let body = {
      name,
      description,
      amount,
      category,
      date,     
      recurringType,
    };

    transactionService.postUserExpense(body).then((data) => {
        setSuccess("Expense added successfully!!");
        navigate('/dashboard');
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
              <button class="btn">
                <i class="fa fa-home"></i> Home
              </button>
            </a>
            <h1 className="page">Add Expense</h1>
            <form className="place" onSubmit={addExpenses}>
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
              <p>{formErrors.name}</p>
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
              <p>{formErrors.amount}</p>
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
                <option value="Food and Drinks">Food and Drinks</option>
                <option value="Shopping">Shopping</option>
                <option value="Housing">Housing</option>
                <option value="Transorpation">Transorpation</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Life and Entertainment">
                  Life and Entertainment
                </option>
                <option value="Communication and PC">
                  Communication and PC
                </option>
                <option value="Financial Expenses">Financial Expenses</option>
                <option value="Investments">Investments</option>
                <option value="Others">Others</option>
                <option value="Missing">Missing</option>
              </select>
              <p>{formErrors.category}</p>
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
                  <p>{formErrors.date}</p>
                </div>
              </div>
              <label for="exampleInputEmail1" className="form-label">
                Account Type{" "}
              </label>
              <select
                className="form-select position"
                aria-label="Default select example"
                name="accountType"
                value={formValues.accountType}
                onChange={handleChange}
              >
                <option selected>Select an account</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cash">Cash</option>
              </select>
              <p>{formErrors.account}</p>
              Is this a reccuring expense?
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
                  checked
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

export default Createexpense;
