import axios from "axios";
import is from "./is";

// axios.defaults.baseURL = "http://192.168.0.104:3000/api";

export const get = async (url, config = {}) =>
  await axios.get(url, { ...config }).catch(catchError);

export const post = async (url, data, options = {}) =>
  await axios
    .post(url, data, { withCredentials: true, ...options })
    .catch(catchError);

export const del = async (url) => await axios.delete(url).catch(catchError);

function catchError(err) {
  let code = 404;
  let status = "error";
  let message = "Sorry, something went wrong.";

  if (err.response) {
    code = err.response.status;
    message = err.response.data;
    const { value, valid } = is.json(message);
    if (valid) {
      message = value;
      status = "error-field";
    }
  } else if (err.request) {
    message = "The request was made, but no response was received";
    code = 500;
  }
  return { status, code, message };
}
