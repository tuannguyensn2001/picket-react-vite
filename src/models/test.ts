import { TestContentType } from "~/enum";

export declare interface ITest {
  id: number;
  name: string;
  time_to_do: number;
  time_start: string;
  time_end: string;
}

export declare interface ITestMultipleChoice {
  id: number;
  file_path: string;
  answers: ITestMultipleChoiceAnswer[];
}

export declare interface ITestMultipleChoiceAnswer {
  id: number;
  test_multiple_choice_id: number;
  score: number;
  type: number;
}

export declare interface ITestContent {
  id: number;
  test_id: number;
  typeable_id: number;
  typeable: TestContentType;
  multiple_choice?: ITestMultipleChoice;
}
