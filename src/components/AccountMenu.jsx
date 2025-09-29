// src/components/AccountMenu.jsx
import { useAuth } from "../context/AuthContext";
import React, { useState, useRef, useEffect } from "react";
import {
  LogOut,
  HelpCircle,
  Copy,
  Check,
  X as CloseIcon,
  Twitter,
  Facebook,
  Linkedin,
  Send,
  Share2,
} from "lucide-react";

const DropdownItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-white/10 rounded-lg transition"
  >
    {icon}
    {label}
  </button>
);

const AccountMenu = ({ activeChatId }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef();

  const shareLink = `${window.location.origin}/chat/${activeChatId || "default"}`;
  const shareMessage = `🚀 Check this out with FactGuard AI!\n\n🔎 AI-powered Fact Verification Result\n${shareLink}`;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `🚀 FactGuard AI Verification Result\n\n${shareLink}\n\n🔒 Verified with AI-powered Fact Checking`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareOpen = () => {
    setShareOpen(true);
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <div className="relative flex items-center gap-2" ref={menuRef}>
      {/* Share Button */}
      {/* Share Button */}
<div
  title="Share"
  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-white/80 transition cursor-pointer
             hover:bg-white/5 hover:text-teal-400"
  onClick={handleShareOpen}
>
  <Share2 size={18} />
  <span className="text-sm">Share</span>
</div>


      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full overflow-hidden border-2 border-white hover:ring-2 hover:ring-teal-400 transition"
      >
        <img
          src={user?.photoURL || "https://ui-avatars.com/api/?name=User"}
          alt="Account"
          className="w-8 h-8 rounded-full object-cover"
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-[#1a1a1a]/95 backdrop-blur-md text-white shadow-2xl rounded-xl p-2 border border-gray-700 z-50 animate-fadeIn">
          <div className="px-4 py-2 text-sm text-gray-400">{user?.email}</div>
          <hr className="my-2 border-gray-700" />
          <DropdownItem
            icon={<HelpCircle size={16} />}
            label="Help"
            onClick={() => setHelpOpen(true)}
          />
          <DropdownItem
            icon={<LogOut size={16} />}
            label="Log out"
            onClick={logout}
          />
        </div>
      )}

      {/* Share Modal */}
      {shareOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[100] animate-fadeIn">
          <div className="bg-[#121212] rounded-2xl shadow-2xl border border-white/10 p-8 w-[95%] max-w-md relative animate-scaleIn">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
              onClick={() => setShareOpen(false)}
            >
              <CloseIcon size={22} />
            </button>

            <h2 className="text-lg font-medium mb-6 text-white text-center tracking-tight">
              Share this chat
            </h2>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <div className="flex space-x-2">
                  <span className="w-3 h-3 bg-white/80 rounded-full animate-bounce"></span>
                  <span className="w-3 h-3 bg-white/60 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-3 h-3 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <p className="text-gray-400 text-sm">
                  Preparing your secure share link…
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center bg-[#1c1c1c] border border-white/10 rounded-lg px-3 py-2 mb-6 shadow-inner">
                  <p className="flex-1 text-gray-300 text-sm truncate">
                    {shareLink}
                  </p>
                  <button
                    onClick={handleCopy}
                    className="ml-2 p-2 rounded-lg hover:bg-white/10 transition relative"
                  >
                    {copied && (
                      <span className="absolute -top-8 right-0 text-xs bg-gray-800 text-white px-2 py-0.5 rounded-full animate-fadeIn">
                        Copied
                      </span>
                    )}
                    {copied ? (
                      <Check size={18} className="text-green-400" />
                    ) : (
                      <Copy size={18} className="text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Social Icons */}
                <div className="flex items-center justify-center gap-4">
                  {[
                    {
                      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        shareMessage
                      )}`,
                      bg: "bg-[#1DA1F2]",
                      icon: <Twitter size={20} />,
                    },
                    {
                      href: `https://wa.me/?text=${encodeURIComponent(
                        shareMessage
                      )}`,
                      bg: "bg-[#25D366]",
                      icon: <Send size={20} />,
                    },
                    {
                      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        shareLink
                      )}`,
                      bg: "bg-[#1877F2]",
                      icon: <Facebook size={20} />,
                    },
                    {
                      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                        shareLink
                      )}`,
                      bg: "bg-[#0077B5]",
                      icon: <Linkedin size={20} />,
                    },
                  ].map(({ href, bg, icon }, idx) => (
                    <a
                      key={idx}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-11 h-11 flex items-center justify-center rounded-full ${bg} text-white hover:scale-110 hover:opacity-90 transition-all duration-300`}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {helpOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[100]">
    <div className="relative w-[95%] max-w-md bg-[#111111] rounded-2xl border border-white/10 shadow-2xl p-6 animate-in fade-in zoom-in duration-200">
      
      {/* Close */}
      <button
        onClick={() => setHelpOpen(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-xl font-semibold text-white mb-4">
        Help & Support
      </h2>

      {/* Content */}
      <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
        <p>
          <span className="text-teal-400 font-medium">FactGuard</span> helps you
          analyze and verify news in real time.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>Paste or type the news content into the analyzer.</li>
          <li>Click <span className="text-purple-400">Verify</span> to check facts.</li>
          <li>Get a multilingual AI-powered verification report.</li>
        </ul>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-white/10" />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="/help"
          className="flex-1 text-center px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-gray-300 hover:border-teal-400 hover:text-white transition"
        >
          View Docs
        </a>
        <a
          href="mailto:support@factguard.com"
          className="flex-1 text-center px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-purple-500 text-white font-medium hover:opacity-90 transition"
        >
          Contact Support
        </a>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AccountMenu;
