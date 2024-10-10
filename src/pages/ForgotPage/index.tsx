import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface ForgotForm {
    email: string;
}

const ForgotPage = () => {

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({
        email: ''
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setErrors((prev) => ({
            ...prev,
            email: validateEmail(value) ? '' : 'Please enter a valid email address.'
        }));
    };

    const isFormValid = () => {
        return (
            validateEmail(email) 
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isFormValid()) {
            const data:ForgotForm = {
                email: email,
            }
            console.log(data);
  
        }
    };

    return (
        <div className="flex justify-center items-center  bg-[#f1f1f1]">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
            <h2 className="text-2xl font-semibold mb-6">Forgot Password</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                        Email*
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        className={`input input-bordered w-full ${errors.email ? 'border-red-500' : ''}`}
                        required
                    />
                    {!email && !errors.email && <p  className="text-gray-500 text-sm mt-1 font-sans leading-5 text-left">Please provide your email.</p>}
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="flext justify-between " style={{display:'flex'}}>
                    <button
                        type="submit"
                        className="btn bg-[#26818e] text-white"
                        disabled={!isFormValid()}
                    >
                        Send reset link
                    </button>
                    <NavLink to="/login" className="text-primary">Return to login</NavLink >
                </div>

              
            </form>

          
        </div>
    </div>
    )
};

export default ForgotPage;
