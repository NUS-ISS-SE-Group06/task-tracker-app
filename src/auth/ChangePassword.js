import React, { useState } from 'react';
import {BASE_URL} from '../components/common/Constants';

const ChangePassword = () => {
    // State to hold the input field values
    const [current, setCurrentPassword] = useState('');
    const [password, setNewPassword] = useState('');
    const [verify, setVerifyPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errors, setErrors] = useState({});
    const [response,setResponse] = useState(null);

    const handleSubmit =  async(event) => {
        event.preventDefault();
   
        // Validation checks
        const validationErrors = {};
        if(!username){
            validationErrors.username = 'Username is required';
        }
        if (!current) {
            validationErrors.current = 'Current password is required';
        }

        if (!password) {
            validationErrors.password = 'New password is required';
        } else if (password.length < 8) {
            validationErrors.password = 'Password must be at least 8 characters';
        } else if (!/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(password)) {
            validationErrors.password = 'Password must contain at least one letter and one number';
        }

        if (!verify) {
            validationErrors.verify = 'Please re-enter the new password';
        } else if (verify !== password) {
            validationErrors.verify = 'Passwords do not match';
        }

        // If there are validation errors, update the state and stop submission
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Update the state with validation errors
            return;
        }
    
        try {
            // Make a POST request to your Spring Boot endpoint
            const response = await fetch(`${BASE_URL}/api/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    oldPassword: current,
                    newPassword: password,
                }),
            });
    
            const data = await response.json();
    
            // Update the response state based on the server response
            setResponse({
                timestamp: data.timestamp,
                status: response.status,
                error: data.error,
                message: data.message,
                body: data.body,
            });
    
            // Clear form fields after submission
            setCurrentPassword('');
            setNewPassword('');
            setVerifyPassword('');
            setErrors({});
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Change Password</h2>
            {response && response.message !=="Failed" &&(<span className='success'>{response.message}</span>)}
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && <span className="error">{errors.username}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="current">Current Password:</label>
                    <input
                        type="password"
                        id="current"
                        value={current}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    {errors.current && <span className="error">{errors.current}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="verify">Re-enter Password:</label>
                    <input
                        type="password"
                        id="verify"
                        value={verify}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                    />
                    {errors.verify && <span className="error">{errors.verify}</span>}
                </div>
                <button type="submit">Submit</button>
            </form>

            {response && response.error !== "" &&(
                <div  className="response-container">
                    <p>Error:</p>
                    <pre> {response.body}</pre>
                </div>
            )}
        </div>
    );
};

export default ChangePassword;
