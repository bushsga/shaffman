import { useState, useEffect } from "react";
import { getAllPosts, getFeaturedPost } from "../lib/queries";
import FeaturedArticle from "../components/FeaturedArticle";
import ArticleCard from "../components/ArticleCard";
import BreakingNewsTicker from "../components/BreakingNewsTicker";

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

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allPosts, featured] = await Promise.all([
          getAllPosts(),
          getFeaturedPost(),
        ]);
        setPosts(allPosts);
        setFeaturedPost(featured);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-red-news border-t-transparent rounded-full animate-spin" />
          <p className="font-body text-gray-news">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Breaking News Ticker */}
      <div className="pt-16">
        <BreakingNewsTicker posts={posts.slice(0, 5)} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Featured Article */}
        {featuredPost && (
          <section className="mb-12">
            <FeaturedArticle post={featuredPost} />
          </section>
        )}

        {/* Category Filter */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <span className="font-body text-sm font-semibold text-gray-news dark:text-white/60 uppercase tracking-wider">
            Filter:
          </span>
          {["all", "politics", "general"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-body text-sm font-medium px-5 py-2 rounded-full border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-red-news text-white border-red-news"
                  : "bg-white dark:bg-navy-light text-gray-news dark:text-white/70 border-gray-200 dark:border-white/10 hover:border-red-news hover:text-red-news"
              }`}
            >
              {cat === "all" ? "All" : cat === "politics" ? "Politics" : "General News"}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-heading text-2xl text-gray-news dark:text-white/50">
              No articles yet
            </p>
            <p className="font-body text-gray-news dark:text-white/40 mt-2">
              Check back soon for new articles!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <ArticleCard key={post._id} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;