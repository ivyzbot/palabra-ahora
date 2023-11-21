import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="navbar bg-base-100 bg-primary">
      <Link
        to={"/"}
        className="btn btn-ghost normal-case text-xl text-primary-content"
      >
        Learn
      </Link>
      <Link
        to={"/review"}
        className="btn btn-ghost normal-case text-xl text-primary-content"
      >
        Review
      </Link>
      <Link
        to={"/test"}
        className="btn btn-ghost normal-case text-xl text-primary-content"
      >
        Test
      </Link>
    </div>
  );
}
