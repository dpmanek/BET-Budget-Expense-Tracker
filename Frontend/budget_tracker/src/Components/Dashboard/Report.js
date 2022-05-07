import axios from "axios";
import React, { useState, Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Report.css";
import AuthService from "../../services/auth.service";
import ReportService from "../../services/report.service";

const posR={
  marginBottom: '190px',
  boxShadow: '5px 6px 6px 2px #e9ecef',
  alignItems: "center",
  borderRadius: 20, 
  backgroundColor: "#6ecebc", 
  fontWeight: "bold"
}

const Report = () => {
  let navigate = useNavigate();
  const initialValues = {
    dateone: "",
    datetwo: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    var data = AuthService.getCurrentUser();
    if (data) {
      setAccessToken(data.accessToken);
    } else {
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

  //   useEffect(() => {
  //     console.log(formErrors);
  //     if (Object.keys(formErrors).length === 0 && isSubmit) {
  //       console.log(formValues);
  //     }
  //   }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.dateone) {
      errors.dateone = "Starting date is required";
    }
    if (!values.name) {
      errors.datetwo = "Ending date is required";
    }
    return errors;
  };

  const genReport = (event) => {
    setError("");
    setSuccess("");
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

  //      if (validate.errors.length == 0) {
          ReportService.getUserReportSpecificRange(formValues).then((data) => {
          setSuccess("Report generated successfully");
          //   navigate("/dashboard");
          }).catch((e) => {
            setError("Opps, something went wrong :(");
        })
//      }
      
      };
  

  return (
    <div>
      {accessToken !== undefined ? (
        <React.Fragment>
          <div className="row col-md-8 offset-md-4">
            <h3>Select dates to generate a report</h3>
            <form className="" onSubmit={genReport}>
              <label for="exampleInputEmail1" className="form-label">
                Select Starting Date
              </label>
              <div className="mb-3 position">
                <label for="dateone" class="col-form-label">
                  Date
                </label>
                <div class="input-group date position" id="datepicker">
                  <input
                    type="date"
                    class="form-control"
                    id="dateone"
                    name="dateone"
                    value={formValues.date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <p>{formErrors.dateone}</p>
              <label for="exampleInputEmail1" className="form-label">
                Select Ending Date
              </label>
              <div className="mb-3 position">
                <label for="datetwo" class="col-form-label">
                  Date
                </label>
                <div class="input-group date position" id="datepicker">
                  <input
                    type="date"
                    class="form-control"
                    id="datetwo"
                    name="datetwo"
                    value={formValues.date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <p>{formErrors.datetwo}</p>
              <div className="col-md-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  value="Submit"
                >
                  Generate Report
                </button>
              </div>
              <div>{error != "" ? error : success}</div>
            </form>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div class="card p-3 mt-2 " style={posR} >
        <h1>Restricted area</h1>
        <h2><a href="/login">Sign In</a> to Generate Report</h2>
        </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Report;
