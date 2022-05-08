import axios from "axios";
import React, { useState, Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Report.css";
import AuthService from "../../services/auth.service";
import ReportService from "../../services/report.service";
import moment from "moment";

const posR = {
  marginBottom: "190px",
  boxShadow: "5px 6px 6px 2px #e9ecef",
  alignItems: "center",
  borderRadius: 20,
  backgroundColor: "#6ecebc",
  fontWeight: "bold",
};

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

  useEffect(() => {
    setFormValues({ ...formValues, datetwo: "" });
  }, [formValues.dateone]);

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

    //if (validate.errors.length == 0) {
    ReportService.getUserReportSpecificRange(formValues)
      .then((response) => {
        //ReportService.getUserReport()
        const file = new Blob([response.data], {
          type: "application/pdf",
        });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);

        //Open the URL on new Window
        window.open(fileURL);
        setSuccess("Report generated successfully");
      })
      .catch((e) => {
        setError("Opps, something went wrong :(");
      });
    // }
  };

  return (
    <div>
      {accessToken !== undefined ? (
        <React.Fragment>
          <div className="row col-md-8 offset-md-4">
            <h3>Select dates to generate a report</h3>
            <form className="" onSubmit={genReport}>
              <label htmlFor="exampleInputEmail1" className="form-label">
                Select Starting Date
              </label>
              <div className="mb-3 position">
                <label htmlFor="dateone" className="col-form-label">
                  Date
                </label>
                <div className="input-group date position" id="datepicker">
                  <input
                    type="date"
                    className="form-control"
                    id="dateone"
                    name="dateone"
                    max={
                      moment()
                        .format()
                        .split("T")[0]
                    }
                    value={formValues.dateone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <p>{formErrors.dateone}</p>
              <label htmlFor="exampleInputEmail1" className="form-label">
                Select Ending Date
              </label>
              <div className="mb-3 position">
                <label htmlFor="datetwo" className="col-form-label">
                  Date
                </label>
                <div className="input-group date position" id="datepicker">
                  <input
                    type="date"
                    className="form-control"
                    id="datetwo"
                    name="datetwo"
                    min={
                      moment(formValues.dateone)
                        .add(1, "day")
                        .format()
                        .split("T")[0]
                    }
                    max={
                      moment()
                        .format()
                        .split("T")[0]
                    }
                    value={formValues.datetwo}
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
          <div className="card p-3 mt-2 " style={posR}>
            <h1>Restricted area</h1>
            <h2>
              <a href="/login">Sign In</a> to Generate Report
            </h2>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Report;
