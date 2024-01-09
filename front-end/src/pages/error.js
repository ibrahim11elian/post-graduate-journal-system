import { Button } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div
      className="d-flex flex-column justify-content-end align-items-center"
      style={{ height: "50vh" }}
    >
      {/* Display 404 Not Found message */}
      <h1>404 Not Found</h1>

      {/* Provide a link to the home page */}
      <Link to={"/"} className="d-block mt-3">
        <Button variant="outline-secondary">
          <>
            الرئيسية <FaHome />
          </>
        </Button>
      </Link>
    </div>
  );
}

export default Error;
