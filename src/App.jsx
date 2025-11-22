import PostsPage from "./features/posts/pages/PostsPage";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 py-5 backdrop-blur bg-slate-900/70">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-300 text-transparent bg-clip-text">
            React + Django Blog
          </h1>
        </div>
      </header>

      <PostsPage />
    </div>
  );
}
