import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import API from "~/network";
import { ApiResponse, ApiResponseError } from "~/type";
import {
  useCheckUserDoingTest,
  usePreviewTest,
} from "~/features/answersheet/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Start() {
  const { test } = usePreviewTest();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useCheckUserDoingTest({
    onSuccess(check: boolean) {
      if (check) {
        navigate(`/answersheet/do/test/${id}`);
      }
    },
  });
  const start = useMutation<ApiResponse, ApiResponseError, number | undefined>({
    mutationFn: async (testId) => {
      const response = await API.post("/v1/answersheets/start", {
        test_id: testId,
      });
      return response.data;
    },
    onSuccess(response) {
      navigate(`/answersheet/do/test/${id}`);
    },
    onError(error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại");
    },
  });

  const handleClickStart = () => {
    start.mutate(test?.id);
  };

  return (
    <div>
      <div>
        <div>{test?.id}</div>
        <div>{test?.name}</div>
        <div>{test?.time_to_do}</div>
        <Button onClick={handleClickStart}>Start</Button>
      </div>
    </div>
  );
}

export default Start;
