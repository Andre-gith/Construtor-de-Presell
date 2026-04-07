import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import formatContent from "../utils/formatContent"; // 🔥 ADD

export default function CreatePresell() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    step1Content: "",
    step2Content: "",
    step3Content: "",
    redirectUrl: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // 🔥 AQUI ESTÁ A MÁGICA
      const formattedData = {
        ...form,
        step1Content: formatContent(form.step1Content),
        step2Content: formatContent(form.step2Content),
        step3Content: formatContent(form.step3Content, true),
      };

      await api.post("/presell", formattedData);

      alert("Presell criada!");
      navigate("/dashboard");
    } catch (err) {
      alert("Erro ao criar presell");
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-center">
      <div className="w-full max-w-2xl p-8">
        <h1 className="text-3xl mb-6 font-bold">Criar Presell</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            name="title"
            placeholder="Título da página"
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 border border-gray-700"
          />

          <input
            name="slug"
            placeholder="Slug (ex: oferta1)"
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 border border-gray-700"
          />

          <textarea
            name="step1Content"
            placeholder="Step 1 (conteúdo inicial)"
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 border border-gray-700 h-28"
          />

          <textarea
            name="step2Content"
            placeholder="Step 2 (engajamento)"
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 border border-gray-700 h-28"
          />

          <textarea
            name="step3Content"
            placeholder="Step 3 (conversão)"
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 border border-gray-700 h-28"
          />

          <input
            name="redirectUrl"
            placeholder="Link final (afiliado)"
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 border border-gray-700"
          />

          <button className="bg-green-500 hover:bg-green-600 transition p-3 rounded font-bold">
            Criar Presell
          </button>
        </form>
      </div>
    </div>
  );
}