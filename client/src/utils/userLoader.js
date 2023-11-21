import { defer } from "react-router-dom";
import axios from "axios";

const userLoader = async ({ request, params }) => {
  const res = await axios.get(process.env.REACT_APP_BACKEND_URL + `/users/${params.username}`);
  return defer({ results: res.data });
};

export default userLoader;