import React from "react";
import {
  MessageSquareText,
  Star,
  User,
  CalendarDays,
} from "lucide-react";

/**
 * FeedbackCard
 *
 * Displays customer feedback, rating,
 * reason and customer information.
 *
 * Props:
 * - feedback: feedback object
 * - onView: optional callback
 */

const FeedbackCard = ({ feedback = {}, onView }) => {
  const {
    id = "FDB-0001",
    customerName = "Anonymous Customer",
    rating = 3,
    comment = "No feedback provided.",
    reason = "Not specified",
    date = "Recently",
    sentiment = "Neutral",
  } = feedback;

  const getSentimentClass = () => {
    switch (sentiment?.toLowerCase()) {
      case "positive":
        return "sentiment-positive";

      case "negative":
        return "sentiment-negative";

      case "neutral":
      default:
        return "sentiment-neutral";
    }
  };

  const safeRating = Math.min(Math.max(Number(rating) || 0, 0), 5);

  return (
    <article className="feedback-card">

      {/* Header */}
      <div className="feedback-card-header">

        <div className="feedback-user">

          <div className="feedback-avatar">
            <User size={20} />
          </div>

          <div>
            <h3>{customerName}</h3>
            <span>{id}</span>
          </div>

        </div>

        <span className={`sentiment-badge ${getSentimentClass()}`}>
          {sentiment}
        </span>

      </div>

      {/* Rating */}
      <div className="feedback-rating">

        <div className="star-container">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={18}
              className={
                star <= safeRating
                  ? "star-filled"
                  : "star-empty"
              }
              fill={
                star <= safeRating
                  ? "currentColor"
                  : "none"
              }
            />
          ))}
        </div>

        <span className="rating-value">
          {safeRating}/5
        </span>

      </div>

      {/* Feedback */}
      <div className="feedback-content">

        <MessageSquareText
          size={20}
          className="feedback-icon"
        />

        <p>{comment}</p>

      </div>

      {/* Reason */}
      <div className="feedback-reason">

        <span className="feedback-label">
          Reason
        </span>

        <span className="feedback-reason-value">
          {reason}
        </span>

      </div>

      {/* Footer */}
      <div className="feedback-card-footer">

        <div className="feedback-date">

          <CalendarDays size={16} />

          <span>{date}</span>

        </div>

        {onView && (
          <button
            type="button"
            className="feedback-view-button"
            onClick={() => onView(feedback)}
          >
            View
          </button>
        )}

      </div>

    </article>
  );
};

export default FeedbackCard;