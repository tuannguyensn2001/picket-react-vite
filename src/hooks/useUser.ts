import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, ApiResponseError } from "~/type";
import { IUser } from "~/models";
import API from "~/network";
import { useMemo } from "react";

export default function useUser() {
  const loader = useLoaderData();

  const { data } = useQuery<ApiResponse<IUser>, ApiResponseError>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await API.get("/v1/users/profile");
      return response.data;
    },
    enabled: !loader,
  });

  const user = useMemo<IUser | undefined>(() => {
    if (loader) {
      return loader as IUser;
    }
    return data?.data;
  }, [data, loader]);

  return {
    user,
  };
}
