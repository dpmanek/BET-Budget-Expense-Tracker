const sn = require("servicenow-rest-api");

const ServiceNow = new sn("dev92862", "admin", "$bWw-GBd5t4F");

ServiceNow.Authenticate();

const fetchIncident = async (incidentno) => {
  const filters = ["number=" + incidentno];
  const fields = ["number", "short_description", "urgency", "state"];
  await ServiceNow.getTableData(fields, filters, "incident", function (res) {
    return res[0];
  });
};

const createIncident = async (issue) => {
  const data = {
    short_description: issue,
    urgency: "1",
  };

  ServiceNow.createNewTask(data, "incident", (res) => {
    console.log("done");
    return res.number;
  });
};

module.exports = {
  fetchIncident,
  createIncident,
};
