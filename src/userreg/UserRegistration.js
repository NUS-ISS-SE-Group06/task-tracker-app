import React, { useState } from 'react';
import { Outlet } from "react-router-dom";

import { signUp } from '../services/authService'; // Import the login function from authService
import {getCookieValue} from '../services/cookieService';
import { handleLogout } from '../services/authService';

import '../assets/styles/Dashboard.css'; // Import CSS file for login component stylesß
import '../assets/styles/Style.css';


const UserRegistration = (onUserRegistration) => {

  const role = getCookieValue('userRole');
    if (!role) {
        handleLogout();
    }

  const [signupUsername, setSignupUsername] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [userRole, setUserRole] = useState('ROLE_USER');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUserRegSubmit = async (event) => {
    event.preventDefault();
    setError(``);

    if (signupName.length <= 2) {
      setError(`Invalid Name`);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (signupEmail.length <= 2 || !emailRegex.test(signupEmail)) {
      setError(`Invalid Email Address`);
      return;
    }

    if (signupUsername.length <= 2) {
      setError(`Invalid Username`);
      return;
    } 

    try {
      const authToken = getCookieValue('authToken')
      const data = await signUp(signupName,signupEmail,'',userRole, signupUsername, '', authToken);
      setSuccess(`User Registration successfully completed. please ask user to login using Default credentials`);
      setError('');
      console.log('debug:', data);
      setSignupUsername('');
      setSignupName('');
      setSignupEmail('');
      setUserRole('ROLE_USER');
    } catch (error) {
      setSuccess('');
      if (error.response && error.response.status === 404) {
        setError("Apologies. We are currently encountering issues at our end. Please attempt User Registration later.");
      } else {
        setError(error.message);
        console.error('Login failed:', error.message);
      }
    }

  };
 
  return (
    <>
    
            <Outlet />
    <div className="dashboard">
      {error && <p className='error-message'>{error}</p>}
      {success && <p className='success-message'>{success}</p>}
      
      {
        <form onSubmit={handleUserRegSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
              <option value="ROLE_USER">User</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
            />
          </div>

          <button type="submit">Create User</button>
          
        </form>
        
      }
      <Outlet />
      </div>
      
    
    </>
  );
};

export default UserRegistration;
