import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchPost, deletePost } from "../postApi";
import { useFetch } from "../../../hooks/useFetch";
import PostDetail from "../components/PostDetail";

export default function PostDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const postData = useFetch(fetchPost);

  useEffect(() => {
    postData.run(slug);
  }, [slug]);

  const handleDelete = async () => {
    await deletePost(slug);
    navigate("/", { replace: true });
  };

  if (postData.loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-3 py-8">
        <div className="h-6 w-2/3 rounded bg-slate-800/80" />
        <div className="h-4 w-1/3 rounded bg-slate-800/80" />
        <div className="mt-4 space-y-2">
          <div className="h-3 w-full rounded bg-slate-800/70" />
          <div className="h-3 w-5/6 rounded bg-slate-800/70" />
          <div className="h-3 w-4/6 rounded bg-slate-800/70" />
        </div>
      </div>
    );
  }

  if (!postData.data) {
    return (
      <div className="mx-auto max-w-3xl py-10 text-center text-sm text-slate-400">
        Post not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl py-8">
      <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full border border-slate-700/60 bg-slate-900/80 px-3 py-1 text-[11px] text-slate-200 shadow-sm shadow-slate-950/60 transition hover:border-sky-500 hover:text-sky-100"
        >
          ← Back to posts
        </button>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/80">
        <PostDetail post={postData.data} onDelete={handleDelete} />
      </div>
    </div>
  );
}
