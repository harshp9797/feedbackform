import React, { useState } from 'react';
import FeedbackForm from './Componets/Feedback';
import AdminPanel from './Componets/Admin';
import AdminLogin from './Componets/AdminForm';
import { getAuth , onAuthStateChanged , signOut } from 'firebase/auth';
import './App.css'; 

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setIsAdmin(false);
    } catch (error) {
      console.log('Error during logout:', error.message);
    }
  };

  // Check if the user is authenticated on component mount
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  });

  return (
    <div>
        <FeedbackForm />
      {isAdmin ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <AdminPanel />
        </>
      ) : (
        <AdminLogin onLogin={() => setIsAdmin(true)} />
      )}
    
    </div>
  );
};

export default App;
