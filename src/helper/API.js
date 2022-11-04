import axios from "axios";

// const url = "http://localhost:5000/";
const url = "https://cyber-tracking-system-api.herokuapp.com/";

const Axios = axios.create({
  baseURL: url,
});

export default Axios;
