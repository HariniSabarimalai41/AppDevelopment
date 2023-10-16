import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import './Feedback.css';

const Feedback = () => {
  const [isSubmitted, setSubmitted] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const [feedback, setFeedback] = useState({
    name: "",
    date: "",
    rating: "",
    review: ""
  });

  const { name, date, rating, review } = feedback;
  
  const onInputChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const movieDataFromHome = location.state?.movieData;

    if (movieDataFromHome) {
      setFeedback(movieDataFromHome);
    } else {
      loadFeedback();
    }
  }, []);


  const onSubmit = async (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/feedback/post`, feedback, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  const loadFeedback = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const result = await axios.get('http://localhost:8080/feedback/get', config);
    setFeedback(result.data);
  };

  return (
    <div className="overlay">
      <div className={`feedback-form ${isSubmitted ? 'submitted' : ''}`}>
        <h2>Provide Your Feedback</h2>
        {isSubmitted ? (
          <p>Thank you for your feedback! Your message has been sent to teamflicksnpicks@gmail.com.</p>
        ) : (
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="name"
                id="name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <input
                type="rating"
                id="rating"
                name="rating"
                value={rating}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="feedback">Feedback:</label>
              <textarea 
              id="feedback" 
              name="feedback"
              value={review} 
              rows="4" 
              onChange={(e) => onInputChange(e)} 
              required />
            </div>
            <button type="submit" onClick={handleSubmit}>Submit Feedback</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Feedback;
