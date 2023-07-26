import React, { useEffect, useState } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import db from './FbConfig'; // Import your Firebase config file
import './Admin.css';

const AdminPanel = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedbackKey, setSelectedFeedbackKey] = useState(null);

  useEffect(() => {
    // Fetch feedback data from Firebase
    const feedbackRef = ref(db, 'feedback'); // Reference to the 'feedbacks' collection in your Firebase database
    onValue(feedbackRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const feedbackData = Object.entries(data).map(([key, value]) => ({ key, ...value }));
        setFeedbacks(feedbackData);
      }
    });
  }, []);

  const handleDeleteFeedback = (feedbackKey) => {
    setSelectedFeedbackKey(feedbackKey);
  };

  const confirmDeleteFeedback = () => {
    // Delete feedback from Firebase
    if (selectedFeedbackKey) {
      const feedbackRef = ref(db, `feedback/${selectedFeedbackKey}`);
      remove(feedbackRef);
      setSelectedFeedbackKey(null);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Feedback</th>
            <th>Rating</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.key}>
              <td>{feedback.name}</td>
              <td>{feedback.email}</td>
              <td>{feedback.feedback}</td>
              <td>{feedback.rating}</td>
              <td>
                <button onClick={() => handleDeleteFeedback(feedback.key)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation dialog */}
      {selectedFeedbackKey && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete this feedback?</p>
          <div>
            <button onClick={confirmDeleteFeedback}>Yes</button>
            <button onClick={() => setSelectedFeedbackKey(null)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
