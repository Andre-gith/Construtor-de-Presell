import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import formatContent from "../utils/formatContent";

export default function EditPresell() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    step1Content: "",
    step2Content: "",
    step3Content: "",
    redirectUrl: "",
  });

  useEffect(() => {
    async function loadPresell() {
      try {
        const res = await api.get(`/presell`);
        const found = res.data.find((p) => p.id == id);

        if (found) {
          setForm(found);
        }
      } catch (err) {
        console.log(err);
      }
    }

    loadPresell();
  }, [id]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formattedData = {
        ...form,
        step1Content: formatContent(form.step1Content),
        step2Content: formatContent(form.step2Content),
        step3Content: formatContent(form.step3Content),
      };

      await api.put(`/presell/${id}`, formattedData);

      alert("Presell atualizada!");
      navigate("/dashboard");
    } catch (err) {
      alert("Erro ao atualizar");
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-center">
      <div className="w-full max-w-2xl p-8">
        <h1 className="text-3xl mb-6 font-bold">Editar Presell</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 border border-gray-700"
          />

          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 border border-gray-700"
          />

          <textarea
            name="step1Content"
            value={form.step1Content}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 border border-gray-700 h-28"
          />

          <textarea
            name="step2Content"
            value={form.step2Content}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 border border-gray-700 h-28"
          />

          <textarea
            name="step3Content"
            value={form.step3Content}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 border border-gray-700 h-28"
          />

          <input
            name="redirectUrl"
            value={form.redirectUrl}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 border border-gray-700"
          />

          <div className="flex gap-3 mt-4">

            <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
              Salvar
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancelar
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}