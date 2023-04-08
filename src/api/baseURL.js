import axios from "axios";

const baseURL = axios.create({
  baseURL: "https://king-prawn-app-6fvdx.ondigitalocean.app/",
});

export default baseURL;
