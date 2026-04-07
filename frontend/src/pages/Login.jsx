import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert("Email ou senha inválidos");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <form onSubmit={handleLogin} className="bg-gray-900 p-6 rounded w-80">
        <h2 className="text-xl mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 text-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-4 p-2 text-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-500 p-2 mb-3">
          Entrar
        </button>

        {/* 🔥 BOTÃO DE CADASTRO */}
        <p className="text-sm text-center">
          Não tem conta?{" "}
          <Link to="/register" className="text-blue-400">
            Criar conta
          </Link>
        </p>
      </form>
    </div>
  );
}