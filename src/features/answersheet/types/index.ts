import { ITestContent } from "~/models";

export type GetContentResponse = ITestContent & {
  time_left: string;
};
