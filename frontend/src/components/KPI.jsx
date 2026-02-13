import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function KPI({ title, value, icon: Icon, trend, trendValue, color = "blue" }) {
  const getTrendIcon = () => {
    if (trend === 'up') return <ArrowUpRight size={16} className="text-emerald-500" />;
    if (trend === 'down') return <ArrowDownRight size={16} className="text-red-500" />;
    return <Minus size={16} className="text-gray-400" />;
  };

  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
        {Icon && <div className={`kpi-icon ${colorClasses[color] || colorClasses.blue}`}><Icon size={20} /></div>}
      </div>
      <div className="kpi-body">
        <h3 className="kpi-value">{value}</h3>
        {trendValue && (
          <div className="kpi-trend">
            {getTrendIcon()}
            <span className="trend-text">{trendValue}</span>
          </div>
        )}
      </div>

      <style jsx>{`
        .kpi-card {
          background: var(--bg-card);
          padding: 1.5rem;
          border-radius: var(--radius);
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
          border: 1px solid var(--border);
          transition: transform 0.2s;
        }
        
        .kpi-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06);
        }

        .kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .kpi-title {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-muted);
        }

        .kpi-icon {
          padding: 0.5rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Utility classes for colors would typically be in global CSS or CSS modules, 
           but inlining for simplicity here since we aren't using Tailwind */
        .bg-blue-50 { background-color: #eff6ff; }
        .text-blue-600 { color: #2563eb; }
        .bg-emerald-50 { background-color: #ecfdf5; }
        .text-emerald-600 { color: #059669; }
        .bg-purple-50 { background-color: #f3e8ff; }
        .text-purple-600 { color: #9333ea; }
        .bg-orange-50 { background-color: #fff7ed; }
        .text-orange-600 { color: #ea580c; }
        .text-emerald-500 { color: #10b981; }
        .text-red-500 { color: #ef4444; }
        .text-gray-400 { color: #9ca3af; }

        .kpi-value {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--text-main);
          letter-spacing: -0.025em;
        }

        .kpi-body {
            display: flex;
            align-items: baseline;
            gap: 0.5rem;
        }
        
        .kpi-trend {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
