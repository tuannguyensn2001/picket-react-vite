import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { enableMapSet } from "immer";
import Query_client from "~/config/query_client";

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
      init: (list) => {
        set((state) => {
          list.forEach((item) => {
            const [testId, questionId] = item;
            state.answers[`${testId.toString()}-${questionId.toString()}`] = "";
          });
        });
      },
    }))
  )
);

export { useAnswerStore };
