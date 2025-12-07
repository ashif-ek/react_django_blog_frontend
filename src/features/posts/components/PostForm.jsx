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
    <form onSubmit={submit} className="space-y-4">
      <input
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-900 transition-all font-serif text-lg"
        name="title"
        value={form.title}
        onChange={handle}
        placeholder="Title your story..."
        required
      />
      <textarea
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-900 transition-all min-h-[200px] resize-none leading-relaxed"
        name="content"
        rows={4}
        value={form.content}
        onChange={handle}
        placeholder="Tell your story..."
        required
      />
      <div className="flex justify-end">
        <button className="bg-black text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors shadow-sm">
          Publish Story
        </button>
      </div>
    </form>
  );
}
