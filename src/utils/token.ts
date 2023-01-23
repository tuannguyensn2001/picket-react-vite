import { deleteKey } from "./storage";

export const setToken = (token: string) => {
  window.localStorage.setItem("token", token);
};

export const deleteToken = () => {
  deleteKey("token");
};
