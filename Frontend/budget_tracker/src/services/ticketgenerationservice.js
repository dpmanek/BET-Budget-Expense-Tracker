import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/user/data";
const Public_URL = "http://localhost:8080/public";

const createTicket = (body) => {
  return axios
    .post(
      API_URL + "/createComplaint",
      { body: body },
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data;
    });
};

const postTicketID = (body) => {
  return axios
    .post(API_URL + "/trackComplain", { body: body }, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const TicketService = {
  createTicket,
  postTicketID,
};

export default TicketService;
