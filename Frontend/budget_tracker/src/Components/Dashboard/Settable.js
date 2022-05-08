import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import transactionService from "../../services/add.transaction";
import { Link, useNavigate } from "react-router-dom";

const Settable = () => {
  let navigate = useNavigate();
  const [data, setdata] = useState([]);
  useEffect(() => {
    UserService.getUserTransactionData().then((response) => {
      if (response.data) {
        setdata(response.data.Expenditure.OneTime);
      }
    });
  }, []);

  return <div>Settable</div>;
};

export default Settable;
