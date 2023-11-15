import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="navbar bg-base-100">
      <Link to={"/"} className="btn btn-ghost normal-case text-xl">
        Home
      </Link>
      <Link to={"/learn"} className="btn btn-ghost normal-case text-xl">
        Learn
      </Link>
      <Link to={"/review"} className="btn btn-ghost normal-case text-xl">
        Review
      </Link>
      <Link to={"/test"} className="btn btn-ghost normal-case text-xl">
        Test
      </Link>
    </div>
  );
}
