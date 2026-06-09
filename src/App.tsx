import { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const Article = lazy(() => import("./pages/Article"));
const Category = lazy(() => import("./pages/Category"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-red-news border-t-transparent rounded-full animate-spin" />
      <p className="font-body text-gray-news">Loading...</p>
    </div>
  </div>
);

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-light dark:bg-navy transition-colors duration-300">
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
        />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<Article />} />
            <Route path="/category/:category" element={<Category />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
