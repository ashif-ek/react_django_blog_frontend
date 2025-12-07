import CommentSection from "./CommentSection";

export default function PostDetail({ post, onDelete }) {
  return (
    <article className="animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-black text-gray-900 dark:text-gray-100 mb-6 leading-tight transition-colors">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 border-l-2 border-black dark:border-white pl-3 transition-colors">
          <span className="font-semibold text-gray-900 dark:text-gray-200">{post.author_username}</span>
          <span>&middot;</span>
          <span>{new Date(post.created).toLocaleDateString()}</span>
          <span>&middot;</span>
          <span>{post.reading_time || 1} min read</span>
        </div>
      </header>

      <div className="prose prose-lg prose-gray dark:prose-invert max-w-none font-serif text-gray-800 dark:text-gray-200 leading-loose transition-colors">
        <p className="whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center transition-colors">
        <div className="text-sm text-gray-400 dark:text-gray-500">
          {post.views_count} views
        </div>
        <button
          onClick={() => onDelete(post.slug)}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors"
        >
          Delete Story
        </button>
      </div>

      <CommentSection slug={post.slug} />
    </article>
  );
}
