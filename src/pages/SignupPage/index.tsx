import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; 
import { NavLink } from 'react-router-dom';

interface SignupForm {
    email: string;
    password: string;
    confirmPassword: string;
}

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setErrors((prev) => ({
            ...prev,
            email: validateEmail(value) ? '' : 'Please enter a valid email address.'
        }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setErrors((prev) => ({
            ...prev,
            password: validatePassword(value) ? '' : 'Password must be at least 8 characters long, with a number and a symbol.'
        }));
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setErrors((prev) => ({
            ...prev,
            confirmPassword: value === password ? '' : 'Passwords do not match.'
        }));
    };

    const isFormValid = () => {
        return (
            validateEmail(email) &&
            validatePassword(password) &&
            password === confirmPassword
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isFormValid()) {
            const data:SignupForm = {
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }
            console.log(data);

        }
    };

    return (
        <div className="flex justify-center items-center  bg-[#f1f1f1]">
            <div className="bg-white rounded-lg shadow-lg  p-8">
                <h2 className="text-2xl font-semibold mb-6">Registration</h2>

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

                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium mb-1" htmlFor="password">
                            Password*
                        </label>
                        <input
                            type={showPass ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className={`input input-bordered w-full pr-10 ${errors.password ? 'border-red-500' : ''}`}
                            required
                        />
                        {!showPass ? (
                            <AiFillEyeInvisible
                                className="absolute top-9 right-3 cursor-pointer"
                                size={20}
                                onClick={() => setShowPass(!showPass)}
                            />
                        ) : (
                            <AiFillEye
                                className="absolute top-9 right-3 cursor-pointer"
                                size={20}
                                onClick={() => setShowPass(!showPass)}
                            />
                        )}
                        {!password && !errors.password && <p  className="text-gray-500 text-sm mt-1 font-sans leading-5 text-left">At least 8 characters with a number & symbol.</p>}
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium mb-1" htmlFor="confirm-password">
                            Confirm Password*
                        </label>
                        <input
                            type={showConfirmPass ? "text" : "password"}
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className={`input input-bordered w-full pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                            required
                        />
                        {!showConfirmPass ? (
                            <AiFillEyeInvisible
                                className="absolute top-9 right-3 cursor-pointer"
                                size={20}
                                onClick={() => setShowConfirmPass(!showConfirmPass)}
                            />
                        ) : (
                            <AiFillEye
                                className="absolute top-9 right-3 cursor-pointer"
                                size={20}
                                onClick={() => setShowConfirmPass(!showConfirmPass)}
                            />
                        )}
                        {!confirmPassword && !errors.confirmPassword && (
                            <p className="text-gray-500 text-sm mt-1 font-sans leading-5 text-left">
                                At least 8 characters with a number & symbol.
                            </p>
                        )}

                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>

                    <div className="mb-6">
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={!isFormValid()}
                        >
                            Continue
                        </button>
                    </div>

                    <p className="text-center">
                        Already registered? <NavLink to="/login" className="text-primary">Sign In</NavLink >
                    </p>
                </form>

                <p className="text-xs text-center mt-4">
                    By signing up, you confirm that you have accepted our{' '}
                    <a href="#" className="text-primary">Terms and Conditions</a> and{' '}
                    <a href="#" className="text-primary">Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
};

export default Signup;
