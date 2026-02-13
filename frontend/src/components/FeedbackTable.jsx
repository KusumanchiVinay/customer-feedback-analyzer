import React from 'react';
import { Star } from 'lucide-react';

const FeedbackTable = ({ feedbacks }) => {
    if (!feedbacks || feedbacks.length === 0) {
        return <div className="no-data">No feedback available yet.</div>;
    }

    const getSentimentColor = (sentiment) => {
        switch (sentiment?.toLowerCase()) {
            case 'positive': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'negative': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="table-container">
            <table className="feedback-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>User</th>
                        <th>Rating</th>
                        <th>Feedback</th>
                        <th>Sentiment</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map((item, index) => (
                        <tr key={index}>
                            <td className="font-medium">{item.product}</td>
                            <td className="text-muted">{item.name || 'Anonymous'}</td>
                            <td>
                                <div className="rating-cell">
                                    <Star size={14} fill="#eab308" stroke="#eab308" />
                                    <span>{item.rating}</span>
                                </div>
                            </td>
                            <td className="feedback-text">{item.feedback}</td>
                            <td>
                                <span className={`badge ${getSentimentColor(item.sentiment)}`}>
                                    {item.sentiment}
                                </span>
                            </td>
                            <td className="text-muted text-sm">
                                {new Date(item.date).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <style jsx>{`
        .table-container {
          background: var(--bg-card);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          overflow: hidden;
          overflow-x: auto;
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
        }

        .no-data {
            padding: 2rem;
            text-align: center;
            color: var(--text-muted);
            background: var(--bg-card);
            border-radius: var(--radius);
            border: 1px solid var(--border);
        }

        .feedback-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.875rem;
        }

        .feedback-table th {
          background: #f8fafc;
          padding: 1rem 1.5rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--border);
        }

        .feedback-table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border);
          color: var(--text-main);
          vertical-align: top;
        }

        .feedback-table tr:last-child td {
          border-bottom: none;
        }

        .feedback-table tr:hover td {
           background-color: #f8fafc;
        }

        .font-medium { font-weight: 500; }
        .text-muted { color: var(--text-muted); }
        .text-sm { font-size: 0.75rem; }

        .rating-cell {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 600;
        }

        .feedback-text {
          max-width: 400px;
          line-height: 1.5;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.625rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          border: 1px solid transparent;
        }

        /* Badge Colors */
        .bg-emerald-100 { background-color: #d1fae5; }
        .text-emerald-800 { color: #065f46; }
        .border-emerald-200 { border-color: #a7f3d0; }

        .bg-red-100 { background-color: #fee2e2; }
        .text-red-800 { color: #991b1b; }
        .border-red-200 { border-color: #fecaca; }

        .bg-gray-100 { background-color: #f3f4f6; }
        .text-gray-800 { color: #1f2937; }
        .border-gray-200 { border-color: #e5e7eb; }
      `}</style>
        </div>
    );
};

export default FeedbackTable;
