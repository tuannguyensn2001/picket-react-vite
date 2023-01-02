import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, ApiResponseError } from "~/type";
import { ITest } from "~/models";
import API from "~/network";
import { useMemo } from "react";

export default function usePreviewTest() {
  const { id } = useParams();
  const { data } = useQuery<ApiResponse<ITest>, ApiResponseError>({
    queryKey: ["preview-test-id", id],
    queryFn: async () => {
      const response = await API.get(`/v1/tests/preview/${id}`);
      return response.data;
    },
  });

  const test = useMemo<ITest | null>(() => {
    if (!data?.data) return null;
    return data.data;
  }, [data]);

  return { test };
}
