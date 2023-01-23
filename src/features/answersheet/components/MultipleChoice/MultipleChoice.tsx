import { ITestMultipleChoiceAnswer } from "~/models";
import { Button, Input, TextField } from "@mui/material";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { CountTime, TopicFile } from "~/features/answersheet/components";

interface Prop {
  answers: ITestMultipleChoiceAnswer[];
  changeAnswer: (questionId: number, answer: string) => void;
  getAnswer: (questionId: number) => string | undefined;
}

export function MultipleChoice({ answers, changeAnswer, getAnswer }: Prop) {
  const [activeAnswer, setActiveAnswer] = useState<number>(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOnChange = (answer: string) => {
    // timeout.current && clearTimeout(timeout.current);
    // timeout.current = setTimeout(() => {
    //   changeAnswer(activeAnswer, event.target.value);
    // }, 0);
    return () => {
      changeAnswer(activeAnswer, answer);
    };
  };

  const answer = useMemo<string | undefined>(() => {
    const result = getAnswer(activeAnswer);
    console.log(result);
    return result;
  }, [activeAnswer, getAnswer]);

  // return (
  //   <div className={"tw-h-screen tw-w-full"}>
  //     <TopicFile />
  //   </div>
  // );

  return (
    <div className={"tw-flex"}>
      <div className={"tw-w-1/2"}>
        <TopicFile />
      </div>
      {/*<CountTime />*/}
      <div className={"tw-w-1/2"}>
        <CountTime />
        <div className={"tw-mt-10"}>
          <div className={"tw-mb-10"}>Câu {activeAnswer + 1} :</div>
          <div className="tw-flex tw-justify-center">
            {answers.map((item, index) => (
              <div className={"tw-ml-2"} key={item.id}>
                <Button
                  onClick={() => setActiveAnswer(index)}
                  variant={activeAnswer === index ? "contained" : "outlined"}
                  key={item.id}
                >
                  {index + 1}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className={"tw-mt-10"}>
          <div className="tw-flex tw-justify-center">
            {["A", "B", "C", "D"].map((item) => (
              <div key={item} className={"tw-ml-2"}>
                <Button
                  key={item}
                  onClick={handleOnChange(item)}
                  variant={answer === item ? "contained" : "outlined"}
                >
                  {item}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
