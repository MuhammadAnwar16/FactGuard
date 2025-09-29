import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ShieldCheck,
  CheckCircle,
  XCircle,
} from "lucide-react";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ new loading state

  const { login } = useAuth();
  const navigate = useNavigate();

  const getPasswordStrength = () => {
    if (!password) return { label: "", color: "" };
    if (password.length < 6)
      return { label: "Weak", color: "bg-red-500" };
    if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8)
      return { label: "Strong", color: "bg-green-500" };
    return { label: "Medium", color: "bg-yellow-500" };
  };

  const validateForm = () => {
    let newErrors = {};
    if (!isLogin) {
      if (!name.trim()) newErrors.name = "Full name is required.";
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        newErrors.email = "Please enter a valid email address.";
    }
    if (!username.trim()) newErrors.username = "Username is required.";
    if (!password || password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";
    if (!isLogin && password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // start loading
    try {
      const success = await login(username, password); // simulate async login

      if (success) {
        const message = isLogin
          ? { title: "Login Successful", subtitle: "Welcome back!" }
          : { title: "Account Created", subtitle: "You’re all set to explore!" };

        setToast(message);

        // Redirect after short delay
        setTimeout(() => {
          setToast(null);
          navigate("/analyze");
        }, 2500);
      } else {
        setErrors({
          form: isLogin ? "Invalid credentials" : "Signup failed",
        });
      }
    } catch (err) {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setLoading(false); // stop loading
    }
  };

  const getBorderClass = (field) => {
    if (!touched[field]) return "border-[#2c2c2c]";
    if (errors[field]) return "border-red-500";
    return "border-green-500";
  };

  const getRightIcon = (field) => {
    if (!touched[field]) return null;
    if (errors[field])
      return <XCircle size={16} className="text-red-500 absolute right-3" />;
    return <CheckCircle size={16} className="text-green-500 absolute right-3" />;
  };

  const { label: passStrengthLabel, color: passStrengthColor } = getPasswordStrength();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Left Branding Section */}
      <div className="hidden lg:flex flex-col justify-center items-start w-1/2 px-16 bg-gradient-to-br from-[#0f0f0f] via-[#151515] to-[#0a0a0a] relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[radial-gradient(circle,_rgba(0,240,181,0.15)_0%,_transparent_70%)] blur-3xl"></div>
        <h1 className="text-4xl font-bold font-space mb-6">
          FactGuard <span className="text-[#00F0B5]">Secure Access</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-md leading-relaxed">
          Protect yourself from misinformation with{" "}
          <span className="text-white font-medium">
            AI-powered fake news detection
          </span>
          . Log in securely and trust that your data is safe with our
          advanced protection.
        </p>
        <div className="mt-8 flex items-center gap-3 text-sm text-gray-400">
          <ShieldCheck size={22} className="text-[#00F0B5]" />
          <span>Trusted by students, researchers & professionals worldwide.</span>
        </div>
      </div>

      {/* Right Auth Card */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 py-8 sm:py-10 relative overflow-y-auto">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Mobile Heading */}
          <div className="text-center mb-6 lg:hidden">
            <h1 className="text-2xl sm:text-3xl font-bold font-space">
              FactGuard <span className="text-[#00F0B5]">Secure Access</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 px-2">
              Protect yourself with AI-powered fake news detection.
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-[#0c0c0c]/60 backdrop-blur-md border border-[#2c2c2c] rounded-2xl p-6 sm:p-8 shadow-[0_8px_40px_rgba(0,255,255,0.06)] hover:shadow-[0_0_40px_rgba(0,240,181,0.15)] transition-all duration-300">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
              {isLogin ? "Sign in" : "Create account"}
            </h2>

            {/* Google Login */}
            <button
              className="w-full bg-[#111] text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#1a1a1a] transition mb-6 border border-[#2c2c2c]"
              disabled={loading}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            <div className="relative text-center text-xs mb-6 text-white/50">
              <span className="bg-[#0c0c0c]/60 px-2 relative z-10">
                or {isLogin ? "Sign in" : "sign up"} with credentials
              </span>
              <div className="absolute left-0 top-1/2 w-full border-t border-[#2c2c2c] transform -translate-y-1/2" />
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-white">
              {!isLogin && (
                <>
                  {/* Full Name */}
                  <div>
                    <label className="text-sm text-white/70">Full Name</label>
                    <div
                      className={`flex items-center rounded-lg px-3 border ${getBorderClass(
                        "name"
                      )} relative`}
                    >
                      <User size={16} className="text-white/50 mr-2" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setTouched({ ...touched, name: true })}
                        placeholder="John Doe"
                        className="bg-transparent flex-1 py-2 text-sm focus:outline-none"
                      />
                      {getRightIcon("name")}
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm text-white/70">Email</label>
                    <div
                      className={`flex items-center rounded-lg px-3 border ${getBorderClass(
                        "email"
                      )} relative`}
                    >
                      <Mail size={16} className="text-white/50 mr-2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setTouched({ ...touched, email: true })}
                        placeholder="you@example.com"
                        className="bg-transparent flex-1 py-2 text-sm focus:outline-none"
                      />
                      {getRightIcon("email")}
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </>
              )}

              {/* Username */}
              <div>
                <label className="text-sm text-white/70">Username</label>
                <div
                  className={`flex items-center rounded-lg px-3 border ${getBorderClass(
                    "username"
                  )} relative`}
                >
                  <User size={16} className="text-white/50 mr-2" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={() => setTouched({ ...touched, username: true })}
                    placeholder="username123"
                    className="bg-transparent flex-1 py-2 text-sm focus:outline-none"
                  />
                  {getRightIcon("username")}
                </div>
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-white/70">Password</label>
                <div
                  className={`relative flex items-center rounded-lg px-3 border ${getBorderClass(
                    "password"
                  )}`}
                >
                  <Lock size={16} className="text-white/50 mr-2" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched({ ...touched, password: true })}
                    placeholder="••••••••"
                    className="bg-transparent flex-1 py-2 text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-8 text-white/50"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  {getRightIcon("password")}
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}

                {/* Password strength */}
                {!isLogin && password && (
                  <div className="mt-2">
                    <div className="w-full bg-[#1a1a1a] h-1 rounded-full">
                      <div
                        className={`h-1 rounded-full ${passStrengthColor} transition-all`}
                        style={{
                          width:
                            passStrengthLabel === "Weak"
                              ? "33%"
                              : passStrengthLabel === "Medium"
                              ? "66%"
                              : "100%",
                        }}
                      />
                    </div>
                    <p className="text-xs mt-1 text-gray-400">{passStrengthLabel}</p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              {!isLogin && (
                <div>
                  <label className="text-sm text-white/70">Confirm Password</label>
                  <div
                    className={`flex items-center rounded-lg px-3 border ${getBorderClass(
                      "confirmPassword"
                    )} relative`}
                  >
                    <Lock size={16} className="text-white/50 mr-2" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={() =>
                        setTouched({
                          ...touched,
                          confirmPassword: true,
                        })
                      }
                      placeholder="Repeat password"
                      className="bg-transparent flex-1 py-2 text-sm focus:outline-none"
                    />
                    {getRightIcon("confirmPassword")}
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* Remember Me */}
              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="accent-[#00F0B5]"
                    />
                    Remember Me
                  </label>
                  <button type="button" className="text-[#00F0B5] hover:underline">
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Errors */}
              {errors.form && (
                <p className="text-red-500 text-xs text-center mt-2">{errors.form}</p>
              )}

              {/* Submit Button with Spinner */}
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00F0B5] to-[#9B59B6] text-black font-semibold py-2 rounded-lg hover:scale-[1.01] transition shadow disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
              </button>
            </form>

            <p className="text-center text-sm text-white/60 mt-6">
              {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                  setTouched({});
                  setPassword("");
                  setConfirmPassword("");
                }}
                className="text-[#00F0B5] hover:underline font-medium"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0c0c0c]/95 backdrop-blur-lg border border-[#2c2c2c] rounded-xl px-6 py-4 shadow-[0_8px_40px_rgba(0,240,181,0.15)] animate-fadeInUp z-50 transition-all duration-500">
          <p className="text-[#00F0B5] font-semibold text-sm flex items-center gap-2">
            <CheckCircle size={16} className="text-[#00F0B5]" />
            {toast.title}
          </p>
          <p className="text-gray-300 text-xs mt-1">{toast.subtitle}</p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
