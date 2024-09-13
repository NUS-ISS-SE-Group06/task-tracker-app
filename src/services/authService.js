// auth/loginApi.js
import { BASE_URL, HOME_URL } from '../components/common/Constants';
//const BASE_URL = 'http://localhost:8688/api/userinfo'; // Replace with your actual API base URL
import {clearCookie} from './cookieService';
export const login = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/userinfo/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
   
    if (data.error !== "") {
      throw new Error('Login failed!');
    }

   
    return data; // Assuming your API returns some data upon successful login
  } catch (error) {
  
    console.error('Error logging in:', error);
    throw error;
  }
};
export const handleLogout = () => {
  console.log('Hi')
 // const handleLogout = () => {
    // Clear cookies or tokens upon logout
    clearCookie('userRole'); // Example: Clear user role cookie
    clearCookie('authToken'); // Example: Clear auth token cookie

    // Redirect to login page after logout
    window.location.href = HOME_URL; // Redirect to login page
  //}
};

export const signUp = async (name, email, groupName, userRole, username, password, authToken) => {
  try {
    if (authToken === undefined){
      authToken = '';
    } else{
      authToken = 'Bearer '+authToken;
    }

    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken
      },
      body: JSON.stringify({ name, email, groupName, userRole, username, password }),
    });
    const data = await response.json();
   
    if (data.error !== "") {
      throw new Error(data.error);
    }

    return data; 

  } catch (error) {
  
    console.error('Error SigningUp in:', error);
    throw error;
  }
};
