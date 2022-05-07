import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/user/data";
const Public_URL = "http://localhost:8080/public";

const getUserReportSpecificRange = (body) => {
  
    return axios
      .post(API_URL + "/reportGeneration", { body: body }, { headers: authHeader() })
        .then(async res => {
          if (res.status === 200) {
            const blob = await res.blob();
            const file = new Blob(
              [blob], 
              {type: 'application/pdf'}
            );
            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
            //Open the URL on new Window
            window.open(fileURL);  
          }
        })
       
      };



  const ReportService = {
    getUserReportSpecificRange,
    
  };
  
  export default ReportService;
  