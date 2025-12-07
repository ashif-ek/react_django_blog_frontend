import CommentSection from "./CommentSection";

export default function PostDetail({ post, onDelete }) {
  return (
    <article className="animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-black text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-gray-500 border-l-2 border-black pl-3">
          <span className="font-semibold text-gray-900">{post.author_username}</span>
          <span>&middot;</span>
          <span>{new Date(post.created).toLocaleDateString()}</span>
          <span>&middot;</span>
          <span>{post.reading_time || 1} min read</span>
        </div>
      </header>

      <div className="prose prose-lg prose-gray max-w-none font-serif text-gray-800 leading-loose">
        <p className="whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
        <div className="text-sm text-gray-400">
          {post.views_count} views
        </div>
        <button
          onClick={() => onDelete(post.slug)}
          className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
        >
          Delete Story
        </button>
      </div>

      <CommentSection slug={post.slug} />
    </article>
  );
}
