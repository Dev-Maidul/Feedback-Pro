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

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.feedback.trim()
    ) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

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
        toast.success("🎉 Thank you for your valuable feedback!");
        setFormData({ name: "", email: "", feedback: "" });
        setTimeout(() => fetchFeedbacks(), 500);
      } else {
        toast.error(result.error || "Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("🚨 Failed to submit feedback. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Feedback copied to clipboard!", { duration: 2000 });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Background */}
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
        {/* Header */}
        <motion.header className="text-center mb-12 sm:mb-20" variants={itemVariants}>
          <motion.h1
            className="text-4xl sm:text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-6 leading-tight"
            variants={itemVariants}
          >
            Share Your
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Feedback
            </span>
          </motion.h1>
          <motion.p
            className="text-base sm:text-xl text-gray-300 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-2"
            variants={itemVariants}
          >
            Join thousands of users who help us improve every day. Your voice matters.
          </motion.p>
        </motion.header>

        {/* Form & Feedback BELOW */}
        <div className="flex flex-col gap-10 xl:gap-16 overflow-x-hidden">
          {/* Form */}
          <motion.div
            className="bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-6 sm:p-10"
            variants={formVariants}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6 sm:space-y-8"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 sm:px-5 sm:py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-cyan-500 text-white text-base sm:text-lg"
                  placeholder="Enter your full name"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 sm:px-5 sm:py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 text-white text-base sm:text-lg"
                  placeholder="Enter your email address"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Your Feedback
                </label>
                <textarea
                  name="feedback"
                  rows="4"
                  value={formData.feedback}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 sm:px-5 sm:py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-purple-500 text-white text-base sm:text-lg resize-none"
                  placeholder="Share your thoughts..."
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isLoading}
                variants={itemVariants}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 sm:py-5 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg disabled:opacity-50 shadow-lg cursor-pointer"
              >
                {isLoading ? "Processing..." : "Submit Your Feedback"}
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Feedback BELOW form */}
          <motion.div
            className="bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-6 sm:p-10"
            variants={listVariants}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Community Feedback
            </h2>
            <div className="space-y-6 max-h-[400px] sm:max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {isLoading && feedbacks.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  Loading community feedback...
                </p>
              ) : feedbacks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No feedback yet. Be the first!
                </p>
              ) : (
                <AnimatePresence>
                  {feedbacks.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={feedbackItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover={{ scale: 1.02 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800/80 border border-gray-700 rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg"
                      onClick={() => copyToClipboard(item.feedback)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-white">{item.name}</h3>
                        <span className="text-xs text-cyan-400">
                          {new Date(item.date).toLocaleDateString("en-BD", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-gray-200">{item.feedback}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </div>

        <motion.footer className="text-center mt-12 py-6 border-t border-gray-700">
          <p className="text-gray-400 text-xs sm:text-sm">
            Technical Assessment from Sofof Tech for • Front-End Developer position • Md Maidul Islam •{" "}
            {new Date().getFullYear()}
          </p>
        </motion.footer>
      </motion.div>

      {/* Scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #3b82f6);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
