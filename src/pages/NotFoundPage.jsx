import { Link } from "react-router-dom";
import Nav from "../components/Nav/Nav";

export default function NotFoundPage() {
  return (
    <>
      <Nav/>
      <div className="container-dark">
      404 not found
      <br />
      <Link to="/">Home</Link>
      </div>
    </>
  );
}
