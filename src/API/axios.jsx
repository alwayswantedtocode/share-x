import axios from "axios";

export default axios.create({
  baseURL: "https://share-x-server.onrender.com",
});

//  "proxy": "https://share-x-server.onrender.com"
