"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const listVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const feedbackItemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
      },
    },
  };

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/feedback");
      if (!response.ok) {
        throw new Error("Failed to fetch feedbacks");
      }
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      toast.error("Failed to load feedbacks. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.feedback.trim()
    ) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Show success toast
        toast.success("🎉 Thank you for your valuable feedback!", {
          duration: 3000,
          style: {
            background: "#065f46",
            color: "#fff",
            border: "1px solid #047857",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
          },
          iconTheme: {
            primary: "#10b981",
            secondary: "#fff",
          },
        });

        setFormData({ name: "", email: "", feedback: "" });
        setTimeout(() => fetchFeedbacks(), 500);
      } else {
        // Show error toast
        toast.error(result.error || "Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error(
        "🚨 Failed to submit feedback. Please check your connection and try again.",
        {
          duration: 6000,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Copy feedback text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Feedback copied to clipboard!", {
        duration: 2000,
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.header className="text-center mb-20" variants={itemVariants}>
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <motion.div
              className="w-24 h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.5)",
              }}
            >
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-6 leading-tight"
            variants={itemVariants}
          >
            Share Your
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Feedback
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Join thousands of users who help us improve every day. Your voice
            matters in shaping the future of our platform.
          </motion.p>
        </motion.header>

        <div className="grid xl:grid-cols-2 gap-10 xl:gap-16">
          {/* Form Section */}
          <motion.div
            className="bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8 lg:p-10"
            variants={formVariants}
          >
            <motion.div
              className="flex items-center gap-4 mb-10"
              variants={itemVariants}
            >
              <motion.div
                className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </motion.div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">
                  Share Your Thoughts
                </h2>
                <p className="text-gray-400">
                  Help us improve with your feedback
                </p>
              </div>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-8"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-200 mb-3 uppercase tracking-wider"
                >
                  Your Name
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-300 placeholder-gray-500 text-white text-lg font-medium group-hover:border-gray-600"
                    placeholder="Enter your full name"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg
                      className="w-6 h-6 text-gray-500 group-hover:text-cyan-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="email"
                  className="block ms:text-sm font-semibold text-gray-200 mb-3 uppercase tracking-wider text-xs"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 placeholder-gray-500 text-white text-lg font-medium group-hover:border-gray-600"
                    placeholder="Enter your email address"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg
                      className="w-6 h-6 text-gray-500 group-hover:text-blue-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="feedback"
                  className="block text-sm font-semibold text-gray-200 mb-3 uppercase tracking-wider"
                >
                  Your Feedback
                </label>
                <div className="relative group">
                  <textarea
                    id="feedback"
                    name="feedback"
                    rows="5"
                    value={formData.feedback}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 placeholder-gray-500 text-white text-lg font-medium resize-none group-hover:border-gray-600"
                    placeholder="Share your thoughts, suggestions, or ideas in detail..."
                  ></textarea>
                  <div className="absolute top-4 right-4">
                    <svg
                      className="w-6 h-6 text-gray-500 group-hover:text-purple-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isLoading}
                variants={itemVariants}
                whileHover={{
                  scale: isLoading ? 1 : 1.02,
                  boxShadow: "0 20px 40px -10px rgba(6, 182, 212, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-5 px-8 rounded-2xl font-bold text-lg disabled:opacity-50 transition-all duration-300 shadow-2xl hover:shadow-3xl relative overflow-hidden group cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                      />
                      Processing Your Feedback...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Submit Your Feedback
                    </>
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                />
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Feedback List Section */}
          <motion.div
            className="bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8 lg:p-10"
            variants={listVariants}
          >
            <motion.div
              className="flex items-center gap-4 mb-10"
              variants={itemVariants}
            >
              <motion.div
                className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: -5 }}
              >
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1m6-8h.01M12 8h.01"
                  />
                </svg>
              </motion.div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">
                  Community Feedback
                </h2>
                <p className="text-gray-400">What our users are saying</p>
              </div>
            </motion.div>

            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-3 custom-scrollbar">
              {isLoading && feedbacks.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full mb-6"
                  />
                  <p className="text-gray-400 text-lg">
                    Loading community feedback...
                  </p>
                </motion.div>
              ) : feedbacks.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-28 h-28 bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <svg
                      className="w-12 h-12 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-300 mb-3">
                    No feedback yet
                  </h3>
                  <p className="text-gray-500 text-lg">
                    Be the first to share your valuable thoughts!
                  </p>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {feedbacks.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={feedbackItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover={{
                        scale: 1.02,
                        y: -5,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                      }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm group cursor-pointer"
                      onClick={() => copyToClipboard(item.feedback)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <motion.div
                            className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            {item.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </motion.div>
                          <div>
                            <h3 className="font-bold text-white text-lg">
                              {item.name}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {item.email}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/20">
                          {new Date(item.date).toLocaleDateString("en-BD", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-gray-200 leading-relaxed text-lg pl-16 group-hover:text-cyan-100 transition-colors duration-200">
                        {item.feedback}
                      </p>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer className="text-center mt-12 py-6 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            Technical Assessment from Sofof Tech• Front-End Developer Position •{"Md Maidul Islam "}
            {new Date().getFullYear()}
          </p>
        </motion.footer>
      </motion.div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #3b82f6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #2563eb);
        }
      `}</style>
    </div>
  );
}
