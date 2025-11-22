import { useNavigate } from "react-router-dom";

export default function PostItem({ post }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/posts/${post.slug}`)}
      className="p-3 bg-slate-900 rounded-md border border-slate-800 cursor-pointer hover:border-indigo-500"
    >
      <div className="font-semibold">{post.title}</div>
      <div className="text-xs text-slate-400">
        {new Date(post.created).toLocaleDateString()}
      </div>
    </div>
  );
}
