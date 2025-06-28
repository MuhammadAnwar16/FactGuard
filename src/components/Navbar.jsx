import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8">
      <div
        className={`relative flex h-[64px] items-center justify-between rounded-2xl border px-4 lg:px-6 backdrop-blur-md transition-all duration-500
          ${
            scrolled
              ? "bg-background border-[#3b3b3b] shadow-[0_8px_40px_rgba(0,255,255,0.06)]"
              : "bg-transparent border-transparent shadow-none"
          }`}
      >
        {/* Glow on scroll */}
        {scrolled && (
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-10 bg-[radial-gradient(ellipse_at_center,_rgba(0,240,181,0.2)_0%,_transparent_70%)] blur-2xl pointer-events-none z-[-1]" />
        )}

        {/* Logo */}
        <Link
          to="/"
          className={`text-lg font-semibold tracking-tight transition-colors ${
            scrolled ? "text-[#00F0B5]" : "text-white"
          }`}
        >
          FactGuard
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`transition duration-300 ${
                location.pathname === link.path
                  ? "text-[#00F0B5] underline underline-offset-4"
                  : scrolled
                  ? "text-white hover:text-[#00F0B5]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <button
              onClick={logout}
              className="px-4 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-sm rounded-lg font-medium shadow transition-all duration-300
    bg-background/5 text-white border border-transparent
    hover:border-[#00F0B5] hover:shadow-[0_0_1px_#00F0B5]"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-2 rounded-2xl bg-[#000000e0] border border-[#2c2c2c] shadow px-4 py-4 space-y-3 text-white">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block text-sm font-medium py-1.5 ${
                location.pathname === link.path
                  ? "text-[#00F0B5] font-semibold"
                  : "text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#2c2c2c]">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-red-500 text-sm hover:text-red-600"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-medium text-[#00F0B5] hover:text-[#9B59B6]"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
