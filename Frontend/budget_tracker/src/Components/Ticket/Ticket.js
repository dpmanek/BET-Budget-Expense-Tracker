import React, { useState, Fragment, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Ticket.css";
import axios from "axios";
import AuthService from "../../services/auth.service";
import TicketService from "../../services/ticketgenerationservice";

const posR = {
  marginBottom: "190px",
  boxShadow: "5px 6px 6px 2px #e9ecef",
  alignItems: "center",
  borderRadius: 20,
  backgroundColor: "#6ecebc",
  fontWeight: "bold",
};

const Ticket = () => {
  let navigate = useNavigate();
  const initialValues = {
    bug: "",
  };
  const [formValues, setFormValues] = useState(initialValues);

  const changeHandlerTicket = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    var data = AuthService.getCurrentUser();
    if (data) {
      setAccessToken(data.accessToken);
    } else {
      setAccessToken(undefined);
    }
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [edit, setEdit] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const validate = (values) => {
    let errors = {};
    if (!values.bugs) {
      errors.bugs = "Bug is required";
    }
    return errors;
  };

  const genTicket = async (event) => {
    setError("");
    setSuccess("");
    event.preventDefault();
    //let error = await validate(formValues);
    // await setFormErrors(error);
    if (Object.keys(error).length === 0) {
      console.log(formValues);
      TicketService.createTicket(formValues)
        .then((data) => {
          console.log(`@@@@@ ${JSON.stringify(data)}`);
          setSuccess("Ticket generated successfully!!");
        })
        .catch((e) => {
          setError("Opps, something went wrong :(");
        });
    }
  };

  //   const getStatus = async (event) => {
  //     setError("");
  //     setSuccess("");
  //     event.preventDefault();
  //     let error = await validate(formValues);
  //     await setFormErrors(error);
  //     if (Object.keys(error).length === 0) {
  //       TicketService.postTicketID(formValues)
  //         .then((data) => {
  //           setSuccess("Status Rendered successfully!!");
  //         })
  //         .catch((e) => {
  //           setError("Opps, something went wrong :(");
  //         });
  //     }
  //   };

  return (
    <div>
      {accessToken !== undefined ? (
        <React.Fragment>
          <form onSubmit={genTicket}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Enter a bug
              </label>
              <input
                type="text"
                name="bug"
                placeholder="Bug"
                className="form-control position"
                value={formValues.bug}
                onChange={changeHandlerTicket}
              />
              <button type="submit" className="btn btn-primary" value="Submit">
                Submit
              </button>
            </div>
          </form>
          {/* <form onSubmit={getStatus}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Enter ticket ID
              </label>
              <input
                type="text"
                name="status"
                placeholder="Description"
                className="form-control position"
                value={formValues.status}
                // onChange={handleStatusChange}
              />
              <button type="submit" className="btn btn-primary" value="Submit">
                Submit
              </button>
            </div>
            <div className="disError">{error !== "" ? error : success}</div>
          </form> */}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="card p-3 mt-2 " style={posR}>
            <h1>Restricted area</h1>
            <h2>
              <a href="/login">Sign In</a> to Generate ticket
            </h2>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Ticket;
