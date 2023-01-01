import { redirect } from "react-router-dom";
import { ApiResponse } from "~/type";
import API from "~/network";
import { IUser } from "~/models";
import { AxiosResponse } from "axios";
import { set } from "~/utils";

export default async function authLoader(request: any) {
  const url = new URL(request.request.url);

  try {
    const response: AxiosResponse<ApiResponse<IUser>> = await API.get(
      "/v1/users/profile"
    );
    return response.data.data;
  } catch (e) {
    set("previous_url", url.pathname);
    return redirect("/login");
  }
}
