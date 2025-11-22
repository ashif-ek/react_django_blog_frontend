import PostItem from "./PostItem";

export default function PostList({ posts, onSelect }) {
  return (
    <div className="space-y-3">
      {posts.map((p) => (
        <PostItem key={p.id} post={p} onSelect={onSelect} />
      ))}
    </div>
  );
}
