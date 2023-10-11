import React from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  return (
    <div className="feedback-form">
      <h2>Feedback Form</h2>
      <form>
        <label htmlFor="feedback">Your Feedback:</label>
        <textarea id="feedback" rows="4" cols="50" placeholder="Enter your feedback" />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
