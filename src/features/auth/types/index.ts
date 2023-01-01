import { IUser } from "~/models";

export type LoginFormType = Pick<IUser, "email" | "password">;
export type LoginResponse = {
  access_token: string;
};
