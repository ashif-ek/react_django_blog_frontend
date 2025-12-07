import CommentSection from "./CommentSection";

export default function PostDetail({ post, onDelete }) {
  return (
    <article>
      <header className="mb-6 border-b border-slate-800 pb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-200 to-white bg-clip-text text-transparent mb-2">
          {post.title}
        </h2>

        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-1">
            <span>By {post.author_username}</span>
          </div>
          <span>•</span>
          <span>{new Date(post.created).toLocaleDateString()}</span>
          <span>•</span>
          <span>{post.reading_time || 1} min read</span>
          <span>•</span>
          <span>{post.views_count} views</span>
        </div>
      </header>

      <div className="prose prose-invert prose-slate max-w-none">
        <p className="whitespace-pre-wrap leading-relaxed text-slate-300">
          {post.content}
        </p>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => onDelete(post.slug)}
          className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors px-3 py-1 rounded hover:bg-red-950/30"
        >
          Delete Post
        </button>
      </div>

      <CommentSection slug={post.slug} />
    </article>
  );
}
