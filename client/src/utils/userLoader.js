import { defer } from "react-router-dom";
import axios from "axios";

const userLoader = async ({ request, params }) => {
  const res = await axios.get(`/users/${params.username}`);
  return defer({ results: res.data });
};

export default userLoader;