import axios from "axios";

export default axios.create({
  // baseURL: "https://share-x-server.onrender.com",
  
  baseURL: "http://localhost:5050",
});

//  "proxy": "https://share-x-server.onrender.com"
