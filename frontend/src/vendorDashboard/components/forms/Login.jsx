import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const Login = ({ showWelcomeHandler }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            // Step 1: Login the vendor
            const response = await fetch(`${API_URL}/vendor/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Login Successful');
                localStorage.setItem('login-token', data.token);
                setEmail('');
                setPassword('');
                showWelcomeHandler();

                // Step 2: Fetch vendor details using the vendorId from the login response
                const vendorId = data.vendorId;
                if (!vendorId) {
                    console.error('Vendor ID not found in login response');
                    return;
                }

                const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
                const vendorData = await vendorResponse.json();

                if (vendorResponse.ok) {
                    const vendorFirmId = vendorData.vendorFirmId;
                    console.log('Firm ID:', vendorFirmId);
                    localStorage.setItem('firmId', vendorFirmId);
                } else {
                    console.error('Failed to fetch vendor details:', vendorData.error);
                }
            } else {
                console.error('Login failed:', data.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
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