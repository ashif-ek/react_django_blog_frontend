import { useState } from "react";

export default function PostForm({ onSubmit }) {
  const [form, setForm] = useState({ title: "", content: "" });

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: "", content: "" });
  };

  return (
    <form onSubmit={submit} className="space-y-3 mb-8">
      <input
        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md"
        name="title"
        value={form.title}
        onChange={handle}
        placeholder="Title"
        required
      />
      <textarea
        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md"
        name="content"
        rows={4}
        value={form.content}
        onChange={handle}
        placeholder="Content..."
        required
      />
      <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md">
        Publish
      </button>
    </form>
  );
}
