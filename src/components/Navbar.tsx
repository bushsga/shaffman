import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ darkMode, toggleDarkMode }: Props) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy shadow-lg py-3"
          : "bg-navy py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-heading font-bold text-white text-2xl tracking-tight">
            Shaff<span className="text-red-news">man</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-white/80 hover:text-white font-body text-sm font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/category/politics"
            className="text-white/80 hover:text-white font-body text-sm font-medium transition-colors duration-200"
          >
            Politics
          </Link>
          <Link
            to="/category/general"
            className="text-white/80 hover:text-white font-body text-sm font-medium transition-colors duration-200"
          >
            General News
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="text-white/80 hover:text-white transition-colors duration-200"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.71.71M6.34 17.66l-.71.71m12.73 0-.71-.71M6.34 6.34l-.71-.71M12 5a7 7 0 100 14A7 7 0 0012 5z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <line x1="2" y1="2" x2="22" y2="22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="22" y1="2" x2="2" y2="22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                <rect width="24" height="2.5" rx="1.25" fill="white" />
                <rect y="7.5" width="24" height="2.5" rx="1.25" fill="white" />
                <rect y="15" width="24" height="2.5" rx="1.25" fill="white" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-light px-6 py-4 flex flex-col gap-4">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="text-white font-body font-medium py-2 border-b border-white/10"
          >
            Home
          </Link>
          <Link
            to="/category/politics"
            onClick={() => setMobileOpen(false)}
            className="text-white font-body font-medium py-2 border-b border-white/10"
          >
            Politics
          </Link>
          <Link
            to="/category/general"
            onClick={() => setMobileOpen(false)}
            className="text-white font-body font-medium py-2"
          >
            General News
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;