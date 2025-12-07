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
        className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/10 focus:border-gray-900 dark:focus:border-gray-100 transition-all font-serif text-lg"
        name="title"
        value={form.title}
        onChange={handle}
        placeholder="Title your story..."
        required
      />
      <textarea
        className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/10 focus:border-gray-900 dark:focus:border-gray-100 transition-all min-h-[200px] resize-none leading-relaxed"
        name="content"
        rows={4}
        value={form.content}
        onChange={handle}
        placeholder="Tell your story..."
        required
      />
      <div className="flex justify-end">
        <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-full font-medium text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm">
          Publish Story
        </button>
      </div>
    </form>
  );
}
