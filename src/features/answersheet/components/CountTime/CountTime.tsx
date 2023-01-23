import { useGetContentTest } from "~/features/answersheet/hooks";
import { useEffect, useMemo, useState } from "react";

export function CountTime() {
  const { data: content } = useGetContentTest();
  const [time, setTime] = useState(0);
  const timeLeft = useMemo<number>(() => {
    if (!content?.time_left) return 0;
    const time_left = content.time_left;
    const split = time_left.split("s");
    if (split.length == 0) return 0;
    return Number(split[0]);
  }, [content]);

  useEffect(() => {
    setTime(timeLeft);
  }, [content]);

  useEffect(() => {
    const id = setInterval(() => {
      setTime((prevState) => prevState - 1);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  const timeLeftStr = useMemo<string>(() => {
    return new Date(time * 1000).toISOString().slice(11, 19);
  }, [time]);

  return (
    <div>
      <div>Thời gian còn lại :</div>
      <div>{timeLeftStr}</div>
    </div>
  );
}
