import axios from "axios";

// const url = "http://localhost:5000/";
const url = "https://azhjtysl67.execute-api.us-east-2.amazonaws.com/production";

// ANY - https://azhjtysl67.execute-api.us-east-2.amazonaws.com/production/{proxy+}
// ANY - https://azhjtysl67.execute-api.us-east-2.amazonaws.com/production


const Axios = axios.create({
  baseURL: url,
});

export default Axios;
