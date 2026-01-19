import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    navigate("/products");
  } catch (err) {
    alert(err.response?.data?.error || "Login failed");
  }
};
  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto" style={{ maxWidth: 400 }}>
        <h3 className="text-center">Login</h3>

        <input className="form-control mb-2" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />

        <input type="password" className="form-control mb-2" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />

        <button className="btn btn-primary w-100" onClick={submit}>
          Login
        </button>

        <p className="text-center mt-3">
          New user? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}