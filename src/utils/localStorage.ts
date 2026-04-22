import type { IUser } from "../types/IUser";

export const getUsuarios = (): any[] => {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
};

export const saveListaUsuarios = (usuarios: any[]) => {
  localStorage.setItem("users", JSON.stringify(usuarios));
};


export const saveUser = (user: IUser) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem("userData", parseUser);
};
export const getUSer = () => {
  return localStorage.getItem("userData");
};
export const removeUser = () => {
  localStorage.removeItem("userData");
};
