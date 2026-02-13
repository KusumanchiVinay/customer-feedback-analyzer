import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, MessageSquarePlus, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/feedback', label: 'Submit Feedback', icon: MessageSquarePlus },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <BarChart3 className="logo-icon" />
          <span className="logo-text">FeedbackAnalyzer</span>
        </div>
        <div className="navbar-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
            >
              <item.icon className="nav-icon" size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <style jsx>{`
        .navbar {
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 50;
          height: var(--header-height);
          display: flex;
          align-items: center;
          padding: 0 2rem;
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        }

        .navbar-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--primary);
        }

        .logo-icon {
          width: 24px;
          height: 24px;
        }

        .navbar-links {
          display: flex;
          gap: 0.5rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: var(--text-muted);
          padding: 0.5rem 1rem;
          border-radius: var(--radius);
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          background-color: var(--bg-main);
          color: var(--text-main);
        }

        .nav-link.active {
          background-color: var(--primary);
          color: white;
        }
        
        @media (max-width: 640px) {
           .navbar {
             padding: 0 1rem;
           }
           .logo-text {
             display: none;
           }
           .navbar-links span {
             display: none;
           }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
