import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        email,
        password,
      });

      alert("Conta criada!");
      navigate("/");
    } catch (err) {
      alert("Erro ao registrar");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <form onSubmit={handleRegister} className="bg-gray-900 p-6 rounded">
        <h2 className="text-xl mb-4">Cadastro</h2>

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

        <button className="w-full bg-blue-500 p-2">Cadastrar</button>
      </form>
    </div>
  );
}