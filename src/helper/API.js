import axios from "axios";

<<<<<<< HEAD
const url = "http://localhost:3000/";
=======
const url = "http://localhost:5000/";
>>>>>>> 1358c069c29f27ae597878b4d3713eef1495fff2
// const url = "https://cyber-tracking-system-api.herokuapp.com/";

const Axios = axios.create({
  baseURL: url,
});

export default Axios;
