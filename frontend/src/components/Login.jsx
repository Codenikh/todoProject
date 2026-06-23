import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      if (!userLogin.email || !userLogin.password) {
        alert("Please fill all fields");
        return;
      }

      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log(data.message);
        navigate("/list");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Login Error:", error);
    }
  };

  return (
    <div className="add-task-container">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userLogin.email}
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userLogin.password}
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button className="submit" type="submit">
          Login
        </button>
      </form>

      <Link className="login" to="/signup">
        Sign Up ?
      </Link>
    </div>
  );
}
