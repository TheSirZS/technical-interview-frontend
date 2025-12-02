import axios from "axios";

const PORT = 3001;
const baseURL: string = `http://localhost:${PORT}`;

export const instanceDB = () => {
  return axios.create({
    baseURL,
  });
};
