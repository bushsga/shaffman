import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">

          {/* Brand */}
          <div className="max-w-xs">
            <Link to="/">
              <span className="font-heading font-bold text-white text-2xl tracking-tight">
                Shaff<span className="text-red-news">man</span>
              </span>
            </Link>
            <p className="text-white/60 font-body text-sm mt-3 leading-relaxed">
              Your trusted source for politics and general news. Stay informed, stay ahead.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row gap-12">
            <div>
              <h4 className="font-body font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                Categories
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/category/politics" className="text-white/60 hover:text-white font-body text-sm transition-colors">
                    Politics
                  </Link>
                </li>
                <li>
                  <Link to="/category/general" className="text-white/60 hover:text-white font-body text-sm transition-colors">
                    General News
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-body font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                Navigation
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-white/60 hover:text-white font-body text-sm transition-colors">
                    Home
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 font-body text-sm">
            © {currentYear} Shaffman. All rights reserved.
          </p>
          <p className="text-white/40 font-body text-sm">
            Built with ❤️ by Ibrahim Jamiu Akeem
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;