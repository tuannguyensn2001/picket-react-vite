import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { enableMapSet } from "immer";
import Query_client from "~/config/query_client";
import API from "~/network";
import { AxiosResponse } from "axios";
import { ApiResponse } from "~/type";

enableMapSet();

interface Answer {
  [key: string]: string;
}

interface AnswerStore {
  answers: Answer;
  changeAnswer: (testId: number, questionId: number, answer: string) => void;
  getAnswer: (testId: number, questionId: number) => string | undefined;
  init: (list: Array<Array<number>>) => void;
}

const useAnswerStore = create<AnswerStore>()(
  devtools(
    immer((set, getState) => ({
      answers: {},
      changeAnswer: (testId, questionId, answer) => {
        set((state) => {
          state.answers[`${testId.toString()}-${questionId.toString()}`] =
            answer;
        });
      },
      getAnswer: (testId, questionId) => {
        return getState().answers[
          `${testId.toString()}-${questionId.toString()}`
        ];
      },
      init: async (list) => {
        if (list.length == 0) return;
        const testId = list[0][0];
        const response = await API.get<
          ApiResponse<
            {
              question_id: number;
              answer: string;
            }[]
          >
        >(`/v1/answersheets/test/${testId}/assignment`);

        const mapAnswer = response.data.data.reduce((total, item) => {
          total.set(Number(item.question_id), item.answer);
          return total;
        }, new Map<number, string>());

        set((state) => {
          list.forEach((item) => {
            const [testId, questionId] = item;
            state.answers[`${testId.toString()}-${questionId.toString()}`] =
              mapAnswer.get(Number(questionId)) || "";
          });
        });
      },
    }))
  )
);

export { useAnswerStore };
