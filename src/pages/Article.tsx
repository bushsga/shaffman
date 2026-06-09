import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { getPostBySlug, getAllPosts } from "../lib/queries";
import ArticleCard from "../components/ArticleCard";
import { motion } from "framer-motion";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  publishedAt: string;
  body: any[];
  mainImage?: {
    asset: {
      url: string;
    };
  };
}

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedPost = await getPostBySlug(slug!);
        setPost(fetchedPost);

        // Get related posts same category
        const allPosts = await getAllPosts();
        const related = allPosts
          .filter((p: Post) => p.category === fetchedPost.category && p._id !== fetchedPost._id)
          .slice(0, 3);
        setRelatedPosts(related);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // Scroll to top when article changes
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-red-news border-t-transparent rounded-full animate-spin" />
          <p className="font-body text-gray-news">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-16 gap-4">
        <h2 className="font-heading text-3xl text-charcoal dark:text-white">
          Article not found
        </h2>
        <Link
          to="/"
          className="font-body text-red-news hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date";

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-body text-sm text-gray-news dark:text-white/60 hover:text-red-news transition-colors mb-8"
          >
            ← Back to Home
          </Link>
        </motion.div>

        {/* Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span className="bg-red-news text-white font-body text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
            {post.category === "politics" ? "Politics" : "General News"}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-heading font-bold text-charcoal dark:text-white text-3xl md:text-5xl leading-tight mt-4 mb-4"
        >
          {post.title}
        </motion.h1>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="font-body text-gray-news dark:text-white/50 text-sm mb-8"
        >
          {formattedDate}
        </motion.p>

        {/* Main Image */}
        {post.mainImage?.asset?.url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl overflow-hidden mb-10 shadow-lg"
          >
            <img
              src={post.mainImage.asset.url}
              alt={post.title}
              className="w-full h-[400px] object-cover"
            />
          </motion.div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="font-body text-lg text-gray-news dark:text-white/70 leading-relaxed mb-8 border-l-4 border-red-news pl-5 italic"
          >
            {post.excerpt}
          </motion.p>
        )}

        {/* Article Body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="prose prose-lg max-w-none
            dark:prose-invert
            prose-headings:font-heading
            prose-headings:text-charcoal
            dark:prose-headings:text-white
            prose-p:font-body
            prose-p:text-gray-news
            dark:prose-p:text-white/70
            prose-p:leading-relaxed
            prose-a:text-red-news
            prose-strong:text-charcoal
            dark:prose-strong:text-white"
        >
          {post.body && <PortableText value={post.body} />}
        </motion.div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 border-t border-gray-200 dark:border-white/10 pt-10">
            <h3 className="font-heading font-bold text-charcoal dark:text-white text-2xl mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <ArticleCard
                  key={relatedPost._id}
                  post={relatedPost}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Article;