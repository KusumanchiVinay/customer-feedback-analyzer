import { useState } from "react";
import API from "../api";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FeedbackForm() {
  const [form, setForm] = useState({
    name: "",
    product: "Analyzer Pro", // Default product
    rating: 0,
    feedback: ""
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.rating === 0) {
      alert("Please select a rating"); // Basic validation
      return;
    }

    setIsSubmitting(true);
    try {
      await API.post("/submit", form);
      setSuccess(true);
      setForm({ name: "", product: "Analyzer Pro", rating: 0, feedback: "" });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-page">
      <motion.div
        className="form-card"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="form-header">
          <h2>We value your opinion</h2>
          <p>Share your experience with us to help us improve.</p>
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              className="success-message"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              key="success"
            >
              <CheckCircle2 size={64} className="text-emerald-500" />
              <h3>Thank You!</h3>
              <p>Your feedback has been submitted successfully.</p>
              <button className="btn-secondary" onClick={() => setSuccess(false)}>
                Submit Another
              </button>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="form"
            >
              <div className="form-group">
                <label>Product</label>
                <select
                  value={form.product}
                  onChange={e => setForm({ ...form, product: e.target.value })}
                  className="form-input"
                >
                  <option>Analyzer Pro</option>
                  <option>Feedback Tool</option>
                  <option>Data Insights</option>
                  <option>Customer Voice</option>
                </select>
              </div>

              <div className="form-group">
                <label>How would you rate your experience?</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="star-btn"
                      onClick={() => setForm({ ...form, rating: star })}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                    >
                      <Star
                        size={32}
                        fill={(hoveredStar || form.rating) >= star ? "#fbbf24" : "none"}
                        stroke={(hoveredStar || form.rating) >= star ? "#fbbf24" : "#cbd5e1"}
                        className="star-icon"
                      />
                    </button>
                  ))}
                </div>
                <div className="rating-label">
                  {form.rating > 0 ? (
                    ["Terrible", "Bad", "Okay", "Good", "Excellent"][form.rating - 1]
                  ) : "Select a rating"}
                </div>
              </div>

              <div className="form-group">
                <label>Your Name (Optional)</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Feedback</label>
                <textarea
                  placeholder="Tell us what you liked or what needs improvement..."
                  rows={4}
                  value={form.feedback}
                  onChange={e => setForm({ ...form, feedback: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <button type="submit" className="btn-submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : (
                  <>
                    <span>Send Feedback</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      <style jsx>{`
        .form-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 140px);
        }

        .form-card {
          background: var(--bg-card);
          padding: 2.5rem;
          border-radius: var(--radius);
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06);
          width: 100%;
          max-width: 500px;
          border: 1px solid var(--border);
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-header h2 {
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }

        .form-header p {
          color: var(--text-muted);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--text-main);
          font-size: 0.875rem;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          font-size: 1rem;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: inherit;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .star-rating {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 0.5rem;
        }

        .star-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: transform 0.1s;
        }

        .star-btn:hover {
          transform: scale(1.1);
        }

        .rating-label {
          text-align: center;
          font-size: 0.875rem;
          color: var(--primary);
          font-weight: 600;
          min-height: 1.25rem;
        }

        .btn-submit {
          width: 100%;
          padding: 0.875rem;
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: var(--radius);
          font-weight: 600;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background-color 0.2s;
        }

        .btn-submit:hover:not(:disabled) {
          background-color: var(--primary-hover);
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .success-message {
          text-align: center;
          padding: 2rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .success-message h3 {
          font-size: 1.5rem;
          color: var(--text-main);
        }

        .success-message p {
          color: var(--text-muted);
        }

        .text-emerald-500 {
            color: var(--sentiment-positive);
        }

        .btn-secondary {
            margin-top: 1rem;
            background: transparent;
            border: 1px solid var(--border);
            padding: 0.5rem 1rem;
            border-radius: var(--radius);
            color: var(--text-muted);
            transition: all 0.2s;
        }

        .btn-secondary:hover {
            border-color: var(--text-muted);
            color: var(--text-main);
        }
      `}</style>
    </div>
  );
}
