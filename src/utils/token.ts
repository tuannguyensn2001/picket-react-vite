import { deleteKey } from "./storage";

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const deleteToken = () => {
  deleteKey("token");
};
