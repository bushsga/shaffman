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
  index?: number;
}

const ArticleCard = ({ post, index = 0 }: Props) => {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/post/${post.slug.current}`}>
        <div className="bg-white dark:bg-navy-light rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group h-full flex flex-col">
          
          {/* Image */}
          <div className="relative overflow-hidden h-48">
            {post.mainImage?.asset?.url ? (
              <img
                src={post.mainImage.asset.url}
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-navy flex items-center justify-center">
                <span className="font-heading font-bold text-white text-2xl">
                  Shaff<span className="text-red-news">man</span>
                </span>
              </div>
            )}

            {/* Category badge */}
            <span className="absolute top-3 left-3 bg-red-news text-white font-body text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              {post.category === "politics" ? "Politics" : "General News"}
            </span>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-heading font-bold text-charcoal dark:text-white text-lg leading-snug mb-2 group-hover:text-red-news transition-colors duration-200 line-clamp-2">
              {post.title}
            </h3>

            {post.excerpt && (
              <p className="font-body text-gray-news dark:text-white/60 text-sm leading-relaxed line-clamp-3 flex-1">
                {post.excerpt}
              </p>
            )}

            {/* Date */}
            <p className="font-body text-gray-news dark:text-white/40 text-xs mt-4">
              {formattedDate}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArticleCard;