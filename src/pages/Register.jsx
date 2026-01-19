import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", { name, email, password });
      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Register failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto" style={{ maxWidth: 400 }}>
        <h3 className="text-center">Register</h3>

        <input
          className="form-control mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-success w-100" onClick={submit}>
          Register
        </button>

        <p className="text-center mt-3">
          Already user? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}