import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const Login = ({ showWelcomeHandler }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
    
        try {
            const response = await fetch(`${API_URL}/vendor/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            console.log('Login API Response:', data); // Debugging
    
            if (!response.ok) {
                alert(`Login failed: ${data.error}`);
                return;
            }
    
            localStorage.setItem('login-token', data.token);
            alert('Login Successful');
    
            const vendorId = data.vendorId;
            if (!vendorId) {
                console.error('Vendor ID not found in login response');
                return;
            }
    
            // Fetch vendor details
            const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
            const vendorData = await vendorResponse.json();
            console.log('Vendor Details API Response:', vendorData); // Debugging
    
            if (!vendorResponse.ok) {
                console.error('Failed to fetch vendor details:', vendorData.error);
                return;
            }
    
            // Extract firm details correctly
            const vendorFirmId = vendorData.vendor.firm.length > 0 ? vendorData.vendor.firm[0]._id : null;
            const vendorFirmName = vendorData.vendor.firm.length > 0 ? vendorData.vendor.firm[0].firmName : null;
    
            if (!vendorFirmId) {
                console.error('Firm ID not found');
            } else {
                console.log('Firm ID:', vendorFirmId);
                console.log('Firm Name:', vendorFirmName);
                localStorage.setItem('firmId', vendorFirmId);
                localStorage.setItem('firmName', vendorFirmName);
            }
    
           // window.location.reload(); // Refresh if needed
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again.');
        }
    };
    

    return (
        <div className="loginSection">
            <form className="authForm" onSubmit={loginHandler}>
                <h3>Vendor Login</h3>
                <br />
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
                <br />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
                <br />
                <div className="btnSubmit">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Login;