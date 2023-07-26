import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import db from './FbConfig';
import './Feedback.css'; // Import the CSS file

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Form validation (you can add more validation logic if needed)
    if (!name || name.trim().length === 0) {
      alert('Please enter your name.');
      return;
    }

    const nameRegex = /^[a-zA-Z ]+$/;
    if (!nameRegex.test(name)) {
      alert('Name can only contain letters and spaces.');
      return;
    }

    const invalidCharactersRegex = /[&!^*]/;
    if (invalidCharactersRegex.test(name)) {
      alert("Name cannot contain &, !, ^, or *.");
      return;
    }

    if (!email || email.trim().length === 0) {
      alert('Please enter your email.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Save feedback to Firebase with a unique key
    const feedbackData = {
      name,
      email,
      feedback,
      rating,
    };
    const feedbackRef = ref(db, 'feedback'); // Reference to the 'feedback' collection in your Firebase database
    push(feedbackRef, feedbackData); // Use push() to create a new child node with a unique key for each feedback submission

    // Clear form inputs after submitting
    setName('');
    setEmail('');
    setFeedback('');
    setRating(0);

    // Display the "Thank you for your feedback" alert
    alert('Thank you for your feedback');
  };

  return (
    <div>
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            required
          >
            <option value={0}>Select Rating</option>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>
        <br />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
