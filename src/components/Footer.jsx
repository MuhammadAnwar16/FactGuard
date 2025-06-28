import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Github, Twitter, Linkedin, ArrowUp } from "lucide-react";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-background text-muted pt-20 pb-10 px-6 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Branding */}
        <div className="md:col-span-1">
          <h2 className="text-white text-2xl font-space font-bold mb-4">
            FactGuard
          </h2>
          <p className="text-sm leading-relaxed">
            AI-powered verification for modern information ecosystems.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="hover:text-primary">
              <Github size={20} />
            </a>
            <a href="#" className="hover:text-primary">
              <Linkedin size={20} />
            </a>
            <a href="#" className="hover:text-primary">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-sm font-semibold text-text uppercase mb-4">
            Product
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link to="/analyze" className="hover:text-primary">
                Analyze
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="hover:text-primary">
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-primary">
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-sm font-semibold text-text uppercase mb-4">
            Resources
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-primary">
                API Docs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-semibold text-text uppercase mb-4">
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-primary">
                Terms
              </Link>
            </li>
            <li>
              <a href="/privacy" className="hover:text-primary">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-muted mt-16">
        &copy; {new Date().getFullYear()} FactGuard. All rights reserved.
      </div>

      {/* Scroll to top button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary text-black p-3 rounded-full shadow-lg hover:scale-105 transition"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
