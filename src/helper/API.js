import axios from "axios";

// const url = "http://localhost:3000/";
const url = "https://cyber-tracking-system-ui.herokuapp.com/";

const Axios = axios.create({
  baseURL: url,
});

export default Axios;
