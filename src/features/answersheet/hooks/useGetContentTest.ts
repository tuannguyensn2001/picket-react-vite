import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, ApiResponseError } from "~/type";
import { ITestContent } from "~/models";
import api from "~/network";

export function useGetContentTest() {
  const { id } = useParams();
  const query = useQuery<ITestContent, ApiResponseError>({
    queryKey: ["test-content", id],
    queryFn: async () => {
      const response = await api.get(`/v1/answersheets/test/${id}/content`);
      return response.data.data as ITestContent;
    },
  });

  return {
    ...query,
  };
}
