import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <Link to={"/login"}>Login</Link>
    </div>
  );
}
export default Home;
