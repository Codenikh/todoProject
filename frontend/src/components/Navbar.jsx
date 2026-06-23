import { Link, useNavigate } from "react-router-dom";
import "../style/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("Logout");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Todo App</Link>
      </div>

      <ul className="nav-links">
        {token ? (
          <>
            <li>
              <Link to="/list">List</Link>
            </li>

            <li>
              <Link to="/add">Add Task</Link>
            </li>

            <li>
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </li>

            <li className="username">{user.name || "Sir"}</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
