import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import AccountMenu from "../components/AccountMenu";
import { Search, Loader2, Upload, Lightbulb, AlertCircle } from "lucide-react";

const Analyze = () => {
  const [input, setInput] = useState("");
  const [, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
        explanation:
          "Further verification is recommended.",
      });
    }, 2000);
  };

  return (
    <section className="h-screen w-full bg-background text-text flex">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-1.5">
          <div className="text-lg font-bold text-primary tracking-tight">
            FactGuard
          </div>
          <AccountMenu />
        </div>

        {/* Main */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 w-full max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-space text-center">
            Analyze News or URL
          </h2>
          <p className="text-muted mb-8 text-lg max-w-xl text-center font-inter">
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
            {/* Search Icon */}
            <div className="flex flex-col items-center gap-2 pr-2 border-r border-border">
              {/* Upload Icon */}
              <label htmlFor="file-upload" className="cursor-pointer group">
                <Upload
                  size={16}
                  className="text-muted group-hover:text-white transition duration-150"
                  title="Upload File"
                />
              </label>

              {/* Hidden File Input */}
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Text Input */}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter headline or URL..."
              className="w-full bg-transparent text-text placeholder:text-muted text-sm focus:outline-none font-inter pl-2"
            />

            {/* Analyze Button */}
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
      </div>
    </section>
  );
};

export default Analyze;
