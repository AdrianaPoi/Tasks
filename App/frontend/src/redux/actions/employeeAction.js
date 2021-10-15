//import api from "./api.js";
import axios from "axios";
import { setHeaders, url } from "../../url";
import { toast } from "react-toastify";
export const ACTION_TYPES = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  FETCH_ALL: "FETCH_ALL",
};

export const fetchAll = () => (dispatch) => {
  axios
    .get(`${url}/all`, setHeaders())
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const create = (data) => (dispatch, getState) => {
  const author = getState().authReducer.name;
  const uid = getState().authReducer.id;
  axios
    .post(`${url}/new`, { ...data, author, uid }, setHeaders())
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error.response);

      toast.error(error.response?.data, {});
    });
};

export const update = (data) => (dispatch) => {
  axios
    .put(`${url}/edit/`, data, setHeaders())
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response?.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
};

export const Delete = (id) => (dispatch) => {
  axios
    .delete(`${url}/delete/${id}`, setHeaders())
    .then(() => {
      dispatch({
        type: ACTION_TYPES.DELETE,
        payload: id,
      });
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response?.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
};
