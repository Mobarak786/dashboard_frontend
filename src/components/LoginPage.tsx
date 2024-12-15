import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock authentication
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true);
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="w-[100%] h-screen flex flex-col justify-center items-center bg-slate-100">
      <h1 className="text-2xl font-semibold mb-10">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col items-center">
        <div className="flex items-center p-2 w-[300px] h-[40px] border border-gray-400  hover:border-green-400">
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex items-center p-2 mt-5 w-[300px] h-[40px] border border-gray-400  hover:border-green-400">
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-400">{error}</p>}
        <button
          className="w-[100px] h-[40px] rounded-md mt-10 bg-green-400 font-bold"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
