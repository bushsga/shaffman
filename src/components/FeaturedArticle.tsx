import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  publishedAt: string;
  mainImage?: {
    asset: {
      url: string;
    };
  };
}

interface Props {
  post: Post;
}

const FeaturedArticle = ({ post }: Props) => {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Link to={`/post/${post.slug.current}`}>
        <div className="relative rounded-2xl overflow-hidden h-[500px] md:h-[580px] group shadow-xl">
          
          {/* Background Image */}
          {post.mainImage?.asset?.url ? (
            <img
              src={post.mainImage.asset.url}
              alt={post.title}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 md:object-center"
            />
          ) : (
            <div className="w-full h-full bg-navy flex items-center justify-center">
              <span className="font-heading font-bold text-white text-4xl">
                Shaff<span className="text-red-news">man</span>
              </span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            {/* Category + Featured badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-red-news text-white font-body text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                {post.category === "politics" ? "Politics" : "General News"}
              </span>
              <span className="bg-white/20 backdrop-blur text-white font-body text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                ⭐ Featured
              </span>
            </div>

            <h2 className="font-heading font-bold text-white text-2xl md:text-4xl leading-tight mb-3 group-hover:text-red-news transition-colors duration-200">
              {post.title}
            </h2>

            {post.excerpt && (
              <p className="font-body text-white/75 text-sm md:text-base leading-relaxed line-clamp-2 max-w-2xl mb-4">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center gap-2">
              <p className="font-body text-white/50 text-xs">
                {formattedDate}
              </p>
              <span className="text-white/50 text-xs">•</span>
              <p className="font-body text-red-news text-xs font-semibold group-hover:underline">
                Read Full Article →
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FeaturedArticle;