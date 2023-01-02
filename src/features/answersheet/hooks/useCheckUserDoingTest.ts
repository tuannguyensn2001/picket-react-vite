import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ApiResponseError } from "~/type";
import API from "~/network";

interface Prop {
  onSuccess?(check: boolean): void;

  onError?(error: ApiResponseError): void;
}

export default function useCheckUserDoingTest(param?: Prop) {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, ...query } = useQuery<boolean, ApiResponseError>({
    queryKey: ["check-doing", id],
    queryFn: async () => {
      const response = await API.get(`/v1/answersheets/test/${id}/check-doing`);
      return Boolean(response?.data?.check);
    },
    onSuccess(check) {
      param?.onSuccess && param.onSuccess(check);
    },
    onError(error) {
      param?.onError && param.onError(error);
    },
  });

  return {
    data,
    ...query,
  };
}
