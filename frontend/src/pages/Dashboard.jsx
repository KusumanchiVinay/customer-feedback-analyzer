import { useEffect, useState } from "react";
import API from "../api";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import KPI from "../components/KPI";
import FeedbackTable from "../components/FeedbackTable";
import { MessageSquare, Star, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/analytics")
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch data", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading-state">Loading Dashboard...</div>;
  if (!data) return <div className="error-state">Failed to load data.</div>;

  const sentimentData = Object.entries(data.sentiments).map(
    ([name, value]) => ({ name, value })
  );

  const COLORS = ['#10b981', '#6b7280', '#ef4444']; // Green, Gray, Red

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      className="dashboard-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="dashboard-header">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="btn-primary" onClick={() => window.location.reload()}>Refresh Data</button>
      </header>

      {/* KPI Section */}
      <div className="kpi-grid">
        <motion.div variants={itemVariants}>
          <KPI
            title="Total Feedback"
            value={data.total_feedback}
            icon={MessageSquare}
            trend="up"
            trendValue="+12% vs last month"
            color="blue"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KPI
            title="Average Rating"
            value={data.average_rating}
            icon={Star}
            trend={data.average_rating > 4 ? "up" : "down"}
            trendValue="Stable"
            color="orange"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KPI
            title="Positive Sentiments"
            value={data.sentiments.Positive}
            icon={TrendingUp}
            color="emerald"
            trend="up"
            trendValue="High Performance"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KPI
            title="Active Users"
            value={data.total_feedback * 3} /* Dummy multiplier for visual */
            icon={Users}
            color="purple"
          />
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <motion.div className="chart-card" variants={itemVariants}>
          <h3>Sentiment Distribution</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div className="chart-card" variants={itemVariants}>
          <h3>Feedback Volume</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sentimentData}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Feedback Section */}
      <motion.div className="recent-feedback-section" variants={itemVariants}>
        <h3>Recent Feedback</h3>
        <FeedbackTable feedbacks={data.data} />
      </motion.div>

      {/* Top Keywords Section */}
      <motion.div className="keywords-section" variants={itemVariants}>
        <h3>Top Keywords</h3>
        <div className="keywords-list">
          {data.keywords.map((k, i) => (
            <span key={i} className="keyword-tag">
              {k[0]} <span className="keyword-count">{k[1]}</span>
            </span>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .page-title {
          font-size: 1.875rem;
          color: var(--text-main);
          margin-bottom: 0.25rem;
        }

        .page-subtitle {
          color: var(--text-muted);
        }

        .btn-primary {
          background-color: var(--primary);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius);
          font-weight: 500;
          transition: background-color 0.2s;
        }

        .btn-primary:hover {
          background-color: var(--primary-hover);
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 1.5rem;
        }

        .chart-card {
          background: var(--bg-card);
          padding: 1.5rem;
          border-radius: var(--radius);
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
          border: 1px solid var(--border);
        }

        .chart-card h3 {
          margin-bottom: 1.5rem;
          color: var(--text-main);
          font-size: 1.125rem;
        }

        .chart-container {
            width: 100%;
            height: 300px;
        }

        .recent-feedback-section h3, .keywords-section h3 {
          margin-bottom: 1rem;
          font-size: 1.25rem;
          color: var(--text-main);
        }

        .keywords-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
        }

        .keyword-tag {
            background-color: #e0e7ff;
            color: #4338ca;
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .keyword-count {
            background-color: rgba(255,255,255,0.5);
            padding: 0.125rem 0.375rem;
            border-radius: 9999px;
            font-size: 0.75rem;
        }

        .loading-state, .error-state {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50vh;
          font-size: 1.25rem;
          color: var(--text-muted);
        }
        
        @media (max-width: 768px) {
            .charts-grid {
                grid-template-columns: 1fr;
            }
        }
      `}</style>
    </motion.div>
  );
}
