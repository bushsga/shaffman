import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostsByCategory } from "../lib/queries";
import ArticleCard from "../components/ArticleCard";
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

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getPostsByCategory(category!);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [category]);

  const categoryName =
    category === "politics" ? "Politics" : "General News";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-red-news border-t-transparent rounded-full animate-spin" />
          <p className="font-body text-gray-news">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body text-sm text-gray-news dark:text-white/60 hover:text-red-news transition-colors mb-8"
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-10 bg-red-news rounded-full" />
            <h1 className="font-heading font-bold text-charcoal dark:text-white text-4xl">
              {categoryName}
            </h1>
          </div>
          <p className="font-body text-gray-news dark:text-white/60 ml-4">
            {posts.length} {posts.length === 1 ? "article" : "articles"} found
          </p>
        </motion.div>

        {/* Articles Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-heading text-2xl text-gray-news dark:text-white/50">
              No articles in {categoryName} yet
            </p>
            <p className="font-body text-gray-news dark:text-white/40 mt-2">
              Check back soon!
            </p>
            <Link
              to="/"
              className="inline-block mt-6 bg-red-news text-white font-body font-semibold px-6 py-3 rounded-full hover:bg-red-news-light transition-colors"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <ArticleCard key={post._id} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Category;