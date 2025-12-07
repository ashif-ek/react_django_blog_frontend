export default function PostItem({ post, onSelect }) {
  return (
    <article 
      onClick={() => onSelect(post.slug)}
      className="group cursor-pointer border-b border-gray-100 pb-8 transition-colors"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          <span>{new Date(post.created).toLocaleDateString()}</span>
          <span>&middot;</span>
          <span>{post.reading_time || 1} min read</span>
        </div>
        
        <h3 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-500 line-clamp-3 leading-relaxed">
          {post.content}
        </p>

        <div className="mt-2 flex items-center gap-2 text-sm font-medium text-black group-hover:underline decoration-1 underline-offset-4">
          Read Story &rarr;
        </div>
      </div>
    </article>
  );
}
