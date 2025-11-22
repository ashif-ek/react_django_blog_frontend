export default function PostDetail({ post, onDelete }) {
  return (
    <>
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="mt-4 whitespace-pre-wrap">{post.content}</p>

      <p className="mt-4 text-xs text-slate-500">
        Created {new Date(post.created).toLocaleString()}
      </p>

      <button
        onClick={() => onDelete(post.slug)}
        className="mt-4 text-red-400 hover:text-red-300 text-sm"
      >
        Delete Post
      </button>
    </>
  );
}
