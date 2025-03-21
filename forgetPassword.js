import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = (e) => {
        e.preventDefault();
        // Add your forgot password logic here
        console.log('Password reset link sent to:', email);
    };

    return (
        <div className="form-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleForgotPassword}>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="cta-button">Send Reset Link</button>
            </form>
        </div>
    );
};

export default ForgotPassword;

