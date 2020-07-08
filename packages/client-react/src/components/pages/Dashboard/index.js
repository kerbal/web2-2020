import React, { useState } from 'react';
import LoginContainer from "./pages/Login/LoginContainer";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      {!currentUser ? (
        <LoginContainer />
      ) : (
          <div>
            Dashboard
          </div>
        )}
    </>
  )
}

export default Dashboard
