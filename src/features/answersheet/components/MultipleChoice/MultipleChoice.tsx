import { ITestMultipleChoiceAnswer } from "~/models";
import { Button, Input, TextField } from "@mui/material";
import { ChangeEvent, useMemo, useRef, useState } from "react";

interface Prop {
  answers: ITestMultipleChoiceAnswer[];
  changeAnswer: (questionId: number, answer: string) => void;
  getAnswer: (questionId: number) => string | undefined;
}

export function MultipleChoice({ answers, changeAnswer, getAnswer }: Prop) {
  const [activeAnswer, setActiveAnswer] = useState<number>(answers[0].id);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    // timeout.current && clearTimeout(timeout.current);
    // timeout.current = setTimeout(() => {
    //   changeAnswer(activeAnswer, event.target.value);
    // }, 0);
    changeAnswer(activeAnswer, event.target.value);
  };

  const answer = useMemo<string | undefined>(() => {
    const result = getAnswer(activeAnswer);
    console.log(result);
    return result;
  }, [activeAnswer, getAnswer]);

  return (
    <div>
      <div>
        {answers.map((item, index) => (
          <Button
            onClick={() => setActiveAnswer(Number(item.id))}
            variant={activeAnswer === item.id ? "contained" : "outlined"}
            key={item.id}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      <div className={"tw-mt-10"}>
        <TextField value={answer} label={"Answer"} onChange={handleOnChange} />
      </div>
    </div>
  );
}
