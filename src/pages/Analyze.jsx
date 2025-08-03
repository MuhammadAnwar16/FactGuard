import Sidebar from "../components/Sidebar";
import AccountMenu from "../components/AccountMenu";
import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Loader2,
  Upload,
  Lightbulb,
  ArrowUp,
  AlertCircle,
  Menu,
} from "lucide-react";

const Analyze = () => {
  const fileInputRef = useRef(null);
  const [input, setInput] = useState("");
  const [, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const exampleHeadlines = [
    "COVID-19 vaccines cause infertility, says study",
    "NASA confirms water on the Moon",
    "Pakistan to host World Cup in 2027",
  ];

  const handleExampleClick = (text) => {
    setInput(text);
    setResult(null);
    setError("");
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setUploading(true);
      setFile(uploadedFile);

      const reader = new FileReader();
      reader.onload = () => {
        setInput(reader.result);
        setUploading(false);
      };

      if (
        uploadedFile.type.includes("text") ||
        uploadedFile.name.endsWith(".txt")
      ) {
        reader.readAsText(uploadedFile);
      } else if (uploadedFile.type === "application/pdf") {
        alert("PDF upload supported, but parsing not implemented yet.");
        setUploading(false);
      } else {
        alert("Unsupported file type.");
        setUploading(false);
      }
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setResult(null);
    setError("");

    if (!input.trim()) {
      setError("Please enter a valid headline or upload a file.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setResult({
        verdict: "Possibly False",
        score: 42,
        explanation: "Further verification is recommended.",
      });
    }, 2000);
  };

  // Disable background scroll when sidebar is open (mobile)
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);
  const startNewAnalysis = () => {
    setInput("");
    setResult(null);
    setError(null);
    setUploading(false);
  };

  return (
    <section className="h-screen w-full bg-background text-text flex">
      {/* Sidebar Drawer */}
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto relative">
        {/* Desktop Header (lg and up) */}
        <div className="hidden lg:flex justify-between items-center px-6 py-2 border-b border-border bg-background z-40">
          {/* Left: FactGuard Logo */}
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-primary tracking-tight font-space">
              FactGuard
            </span>
          </div>

          {/* Right: Share and Account Menu */}
          <div className="flex items-center gap-4 text-sm text-muted">
            <AccountMenu />
          </div>
        </div>

        {/* Mobile Header (<lg screens) */}
        <div className="lg:hidden sticky top-0 z-50 flex justify-between items-center px-4 py-2 bg-background  shadow-md">
          {/* Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-teal-400"
            aria-label="Toggle Sidebar"
          >
            <Menu size={22} />
          </button>
          <h1 className="text-sm font-semibold text-muted">FactGuard</h1>
          {/* New Chat Button */}
          <button
            onClick={startNewAnalysis}
            className="text-sm px-4 py-2 rounded-full bg-gradient-to-r  text-gray-400 hover:text-teal-400 transition lg:absolute lg:right-4"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              aria-hidden="true"
            >
              <path d="M2.6687 11.333V8.66699C2.6687 7.74455 2.66841 7.01205 2.71655 6.42285C2.76533 5.82612 2.86699 5.31731 3.10425 4.85156L3.25854 4.57617C3.64272 3.94975 4.19392 3.43995 4.85229 3.10449L5.02905 3.02149C5.44666 2.84233 5.90133 2.75849 6.42358 2.71582C7.01272 2.66769 7.74445 2.66797 8.66675 2.66797H9.16675C9.53393 2.66797 9.83165 2.96586 9.83179 3.33301C9.83179 3.70028 9.53402 3.99805 9.16675 3.99805H8.66675C7.7226 3.99805 7.05438 3.99834 6.53198 4.04102C6.14611 4.07254 5.87277 4.12568 5.65601 4.20313L5.45581 4.28906C5.01645 4.51293 4.64872 4.85345 4.39233 5.27149L4.28979 5.45508C4.16388 5.7022 4.08381 6.01663 4.04175 6.53125C3.99906 7.05373 3.99878 7.7226 3.99878 8.66699V11.333C3.99878 12.2774 3.99906 12.9463 4.04175 13.4688C4.08381 13.9833 4.16389 14.2978 4.28979 14.5449L4.39233 14.7285C4.64871 15.1465 5.01648 15.4871 5.45581 15.7109L5.65601 15.7969C5.87276 15.8743 6.14614 15.9265 6.53198 15.958C7.05439 16.0007 7.72256 16.002 8.66675 16.002H11.3337C12.2779 16.002 12.9461 16.0007 13.4685 15.958C13.9829 15.916 14.2976 15.8367 14.5447 15.7109L14.7292 15.6074C15.147 15.3511 15.4879 14.9841 15.7117 14.5449L15.7976 14.3447C15.8751 14.128 15.9272 13.8546 15.9587 13.4688C16.0014 12.9463 16.0017 12.2774 16.0017 11.333V10.833C16.0018 10.466 16.2997 10.1681 16.6667 10.168C17.0339 10.168 17.3316 10.4659 17.3318 10.833V11.333C17.3318 12.2555 17.3331 12.9879 17.2849 13.5771C17.2422 14.0993 17.1584 14.5541 16.9792 14.9717L16.8962 15.1484C16.5609 15.8066 16.0507 16.3571 15.4246 16.7412L15.1492 16.8955C14.6833 17.1329 14.1739 17.2354 13.5769 17.2842C12.9878 17.3323 12.256 17.332 11.3337 17.332H8.66675C7.74446 17.332 7.01271 17.3323 6.42358 17.2842C5.90135 17.2415 5.44665 17.1577 5.02905 16.9785L4.85229 16.8955C4.19396 16.5601 3.64271 16.0502 3.25854 15.4238L3.10425 15.1484C2.86697 14.6827 2.76534 14.1739 2.71655 13.5771C2.66841 12.9879 2.6687 12.2555 2.6687 11.333ZM13.4646 3.11328C14.4201 2.334 15.8288 2.38969 16.7195 3.28027L16.8865 3.46485C17.6141 4.35685 17.6143 5.64423 16.8865 6.53613L16.7195 6.7207L11.6726 11.7686C11.1373 12.3039 10.4624 12.6746 9.72827 12.8408L9.41089 12.8994L7.59351 13.1582C7.38637 13.1877 7.17701 13.1187 7.02905 12.9707C6.88112 12.8227 6.81199 12.6134 6.84155 12.4063L7.10132 10.5898L7.15991 10.2715C7.3262 9.53749 7.69692 8.86241 8.23218 8.32715L13.2791 3.28027L13.4646 3.11328ZM15.7791 4.2207C15.3753 3.81702 14.7366 3.79124 14.3035 4.14453L14.2195 4.2207L9.17261 9.26856C8.81541 9.62578 8.56774 10.0756 8.45679 10.5654L8.41772 10.7773L8.28296 11.7158L9.22241 11.582L9.43433 11.543C9.92426 11.432 10.3749 11.1844 10.7322 10.8271L15.7791 5.78027L15.8552 5.69629C16.185 5.29194 16.1852 4.708 15.8552 4.30371L15.7791 4.2207Z"></path>
            </svg>
          </button>
        </div>

        <>
          {/* ✅ MOBILE VERSION (ChatGPT-inspired layout) */}
          <main className="lg:hidden flex flex-col justify-start px-4 sm:px-6 pt-6 pb-28 w-full max-w-7xl mx-auto overflow-y-auto">
            {/* Heading */}
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold font-space text-white">
                Analyze News or URL
              </h2>
              <p className="text-muted mt-2 text-base max-w-md mx-auto font-inter">
                Paste a headline or upload a file — let FactGuard’s AI uncover
                the truth.
              </p>
            </div>

            {/* Suggestions */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {exampleHeadlines.map((headline, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(headline)}
                  className="bg-white/10 hover:bg-primary/10 border border-border text-muted hover:text-primary transition-all duration-300 px-3 py-2 rounded-full text-sm shadow-sm backdrop-blur-md whitespace-nowrap"
                >
                  <Lightbulb size={14} className="inline-block mr-2" />
                  {headline}
                </button>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div className="text-danger text-sm mt-2 mb-4 flex items-center gap-2 font-inter justify-center">
                <AlertCircle size={18} /> {error}
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="mb-4 bg-surface border border-border rounded-2xl p-5 shadow-lg max-w-xl w-full mx-auto text-left relative">
                <h3 className="text-xl font-semibold text-primary mb-2 font-space">
                  {result.verdict}
                </h3>
                <p className="mb-1 font-inter">
                  Credibility Score:{" "}
                  <span className="font-bold text-text">{result.score}%</span>
                </p>
                <p className="text-muted text-sm font-inter">
                  {result.explanation}
                </p>

                <div className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-gradient-to-tr from-red-400 to-orange-500 animate-ping opacity-70" />
                <div
                  className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
                    result.score >= 70
                      ? "bg-gradient-to-r from-green-500 to-teal-500 text-white"
                      : "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                  }`}
                >
                  {result.score >= 70 ? "Real" : "Fake"}
                </div>
              </div>
            )}

            <form
  onSubmit={handleAnalyze}
  className="fixed bottom-[calc(env(safe-area-inset-bottom,1rem)+0.5rem)] left-4 right-4 mx-auto w-[calc(100%-2rem)] max-w-2xl bg-surface border border-border rounded-xl shadow-lg px-4 py-3 flex items-end gap-3 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary z-50"
>
  <label htmlFor="file-upload" className="cursor-pointer">
    <Upload
      size={20}
      className="text-muted hover:text-white transition"
      title="Upload File"
    />
  </label>

  <input
    id="file-upload"
    ref={fileInputRef}
    type="file"
    accept=".pdf,.txt,.doc,.docx"
    onChange={handleFileUpload}
    className="hidden"
  />

  <textarea
    rows={1}
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Enter headline or URL..."
    className="flex-1 resize-none overflow-hidden bg-transparent text-text placeholder:text-muted text-sm focus:outline-none font-inter"
    onInput={(e) => {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    }}
  />

  <button
    type="submit"
    disabled={loading || uploading}
    className="bg-gradient-to-br from-primary to-secondary text-black p-2 rounded-full shadow hover:scale-105 transition flex items-center justify-center"
  >
    {loading ? (
      <Loader2 className="animate-spin" size={18} />
    ) : (
      <ArrowUp size={18} />
    )}
  </button>
</form>

          </main>

          {/* ✅ DESKTOP VERSION */}
          <main className="hidden lg:flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-10 w-full max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-space text-white">
              Analyze News or URL
            </h2>
            <p className="text-muted mb-6 text-lg max-w-xl font-inter">
              Paste a headline or URL and let FactGuard’s AI uncover the truth.
            </p>

            {/* Suggestions */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {exampleHeadlines.map((headline, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(headline)}
                  className="bg-white/10 hover:bg-primary/10 border border-border text-muted hover:text-primary transition-all duration-300 px-4 py-2 rounded-full text-sm shadow-sm backdrop-blur-md"
                >
                  <Lightbulb size={14} className="inline-block mr-2" />
                  {headline}
                </button>
              ))}
            </div>

            {/* Form */}
            <form
              onSubmit={handleAnalyze}
              className="w-full max-w-2xl flex items-center gap-2 bg-surface border border-border rounded-full shadow-lg px-4 py-3 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary relative"
            >
              <div className="flex flex-col items-center gap-2 pr-2 border-r border-border">
                <label
                  htmlFor="file-upload-desktop"
                  className="cursor-pointer group"
                >
                  <Upload
                    size={16}
                    className="text-muted group-hover:text-white transition duration-150"
                    title="Upload File"
                  />
                </label>
                <input
                  id="file-upload-desktop"
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter headline or URL..."
                className="w-full bg-transparent text-text placeholder:text-muted text-sm focus:outline-none font-inter pl-2"
              />

              <button
                type="submit"
                disabled={loading || uploading}
                className="bg-gradient-to-r from-primary to-secondary text-black font-semibold px-5 py-2 rounded-full shadow hover:scale-105 transition text-sm flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Analyze"
                )}
              </button>
            </form>

            {/* Error */}
            {error && (
              <div className="text-danger text-sm mt-4 flex items-center gap-2 font-inter">
                <AlertCircle size={18} /> {error}
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="mt-10 bg-surface border border-border rounded-2xl p-6 shadow-lg max-w-xl w-full text-left relative">
                <h3 className="text-2xl font-semibold text-primary mb-2 font-space">
                  {result.verdict}
                </h3>
                <p className="mb-1 font-inter">
                  Credibility Score:{" "}
                  <span className="font-bold text-text">{result.score}%</span>
                </p>
                <p className="text-muted text-sm font-inter">
                  {result.explanation}
                </p>

                <div className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-gradient-to-tr from-red-400 to-orange-500 animate-ping opacity-70" />
                <div
                  className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
                    result.score >= 70
                      ? "bg-gradient-to-r from-green-500 to-teal-500 text-white"
                      : "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                  }`}
                >
                  {result.score >= 70 ? "Real" : "Fake"}
                </div>
              </div>
            )}
          </main>
        </>
      </div>
    </section>
  );
};

export default Analyze;
