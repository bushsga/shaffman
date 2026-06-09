interface Props {
  posts: {
    _id: string;
    title: string;
    slug: { current: string };
  }[];
}

const BreakingNewsTicker = ({ posts }: Props) => {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="bg-red-news text-white py-2 overflow-hidden flex items-center gap-4">
      {/* Breaking News Label */}
      <div className="flex-shrink-0 bg-charcoal text-white font-body font-bold text-xs px-4 py-1 uppercase tracking-widest">
        Breaking
      </div>

      {/* Scrolling ticker */}
      <div className="overflow-hidden flex-1 relative">
        <div className="ticker-animation whitespace-nowrap font-body text-sm font-medium">
          {posts.map((post, index) => (
            <span key={post._id}>
              <a
                href={`/post/${post.slug.current}`}
                className="hover:underline cursor-pointer"
              >
                {post.title}
              </a>
              {index < posts.length - 1 && (
                <span className="mx-6 opacity-50">•</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;