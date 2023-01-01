import { useLoaderData } from "react-router-dom";
import useUser from "~/hooks";

function Start() {
  const { user } = useUser();

  return <div>start</div>;
}

export default Start;
