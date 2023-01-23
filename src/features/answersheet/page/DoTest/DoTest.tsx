import {
  useCheckUserDoingTest,
  useGetContentTest,
} from "~/features/answersheet/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { TestContentType } from "~/enum";
import { MultipleChoice } from "~/features/answersheet/components";
import { useAnswerStore } from "~/features/answersheet/store";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse, ApiResponseError } from "~/type";
import API from "~/network";

function DoTest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const refAnswer = useRef<{
    testId: number;
    questionId: number;
    answer: string;
  } | null>(null);

  const { isSuccess } = useCheckUserDoingTest({
    onSuccess(check: boolean) {
      if (!check) {
        navigate(`/answersheet/start/test/${id}`);
      }
    },
  });

  const { data: content } = useGetContentTest();
  const store = useAnswerStore((state) => state);

  const userAnswer = useMutation<
    ApiResponse,
    ApiResponseError,
    {
      testId: number;
      questionId: number;
      answer: string;
      previousAnswer: string;
    }
  >({
    mutationFn: async ({ testId, questionId, answer, previousAnswer }) => {
      const response = await API.post("/v1/answersheets/answer", {
        test_id: testId,
        question_id: questionId,
        answer: answer,
        previous_answer: previousAnswer,
      });
      return response.data;
    },
    onSuccess() {
      if (!refAnswer?.current) return;
      const { testId, questionId, answer } = refAnswer.current;
      store.changeAnswer(testId, questionId, answer);
    },
  });

  useEffect(() => {
    if (!content?.multiple_choice?.answers || !content.test_id) return;
    store.init(
      content.multiple_choice.answers.map((item) => [content.test_id, item.id])
    );
  }, [content]);

  const changeAnswer = (questionId: number, answer: string) => {
    if (!content) return;
    // store.changeAnswer(Number(content?.test_id), questionId, answer);
    if (!answer) {
      store.changeAnswer(Number(content?.test_id), questionId, answer);
      return;
    }
    refAnswer.current = {
      testId: Number(content?.test_id),
      questionId: questionId,
      answer: answer,
    };
    userAnswer.mutate({
      testId: content.test_id,
      questionId: questionId,
      answer: answer,
      previousAnswer: getAnswer(questionId) || "",
    });
  };

  const getAnswer = useCallback(
    (questionId: number): string | undefined => {
      if (!content?.test_id) return;
      return store.getAnswer(content.test_id, questionId);
    },
    [content, store]
  );

  return (
    <>
      {isSuccess && (
        <div>
          {Number(content?.typeable) === TestContentType.MULTIPLE_CHOICE && (
            <MultipleChoice
              getAnswer={getAnswer}
              changeAnswer={changeAnswer}
              answers={content?.multiple_choice?.answers || []}
            />
          )}
        </div>
      )}
    </>
  );
}

export default DoTest;
