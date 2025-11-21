import { useEffect, useState } from "react";

const API_BASE = "http://127.0.0.1:8000/api";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: "", content: "" });

  async function fetchPosts() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/posts/`);
      setPosts(await res.json());
    } catch {
      setError("Failed to load posts");
    }
    setLoading(false);
  }

  async function fetchPost(slug) {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/posts/${slug}/`);
      setSelected(await res.json());
    } catch {
      setError("Failed to load post");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function createPost(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${API_BASE}/posts/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({ title: "", content: "" });
      fetchPosts();
    } catch {
      setError("Error creating post");
    }
    setLoading(false);
  }

  async function deletePost(slug) {
    if (!confirm("Delete this post?")) return;
    setLoading(true);
    await fetch(`${API_BASE}/posts/${slug}/`, { method: "DELETE" });
    setSelected(null);
    fetchPosts();
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* HEADER */}
      <header className="border-b border-slate-800 py-5 backdrop-blur bg-slate-900/70">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-300 text-transparent bg-clip-text">
            React + Django Blog
          </h1>
        </div>
      </header>

      {/* LAYOUT */}
      <main className="max-w-6xl mx-auto grid md:grid-cols-[2fr_3fr] gap-6 p-6">

        {/* LEFT SIDEBAR */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Create Post</h2>
          <form onSubmit={createPost} className="space-y-3 mb-8">
            <input
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
            <textarea
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md"
              name="content"
              rows={4}
              value={form.content}
              onChange={handleChange}
              placeholder="Content..."
              required
            ></textarea>
            <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md">
              Publish
            </button>
          </form>

          <h2 className="text-lg font-semibold mb-3">Posts</h2>
          <div className="space-y-3">
            {posts.map((p) => (
              <div
                key={p.id}
                onClick={() => fetchPost(p.slug)}
                className="p-3 bg-slate-900 rounded-md border border-slate-800 cursor-pointer hover:border-indigo-500"
              >
                <div className="font-semibold">{p.title}</div>
                <div className="text-xs text-slate-400">
                  {new Date(p.created).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT PANE */}
        <section className="bg-slate-900 p-5 rounded-xl border border-slate-800">
          {selected ? (
            <>
              <h2 className="text-2xl font-bold">{selected.title}</h2>
              <p className="mt-4 whitespace-pre-wrap">{selected.content}</p>
              <p className="mt-4 text-xs text-slate-500">
                Created {new Date(selected.created).toLocaleString()}
              </p>
              <button
                onClick={() => deletePost(selected.slug)}
                className="mt-4 text-red-400 hover:text-red-300 text-sm"
              >
                Delete Post
              </button>
            </>
          ) : (
            <p className="text-slate-500 text-center">
              Select a post to read its details
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
