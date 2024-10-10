import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

interface LoginForm {
    email: string;
    password: string;
}

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
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

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setErrors((prev) => ({
            ...prev,
            password: validatePassword(value) ? '' : 'Password must be at least 8 characters long, with a number and a symbol.'
        }));
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const isFormValid = () => {
        return (
            validateEmail(email) &&
            validatePassword(password)
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isFormValid()) {
            const data: LoginForm = {
                email: email,
                password: password
            }
            console.log(data);

        }
    };

    return (
        <div className="flex justify-center items-center flex-1 bg-[#f1f1f1]"> {/* flex-1 allows this div to grow and take available space */}
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
            <h2 className="text-2xl font-semibold mb-6">Login</h2>

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
                    {!email && !errors.email && <p className="text-gray-500 text-sm mt-1 font-sans leading-5 text-left">Please provide your email.</p>}
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
                    {!password && !errors.password && <p className="text-gray-500 text-sm mt-1 font-sans leading-5 text-left">At least 8 characters with a number & symbol.</p>}
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="mb-6 flex justify-between align-baseline">
                    <button
                        type="submit"
                        className="btn btn-primary "
                        disabled={!isFormValid()}
                    >
                        Submit
                    </button>

                    <p className="text-center">
                        <NavLink to="/forgot" className="text-primary">Forgot Password</NavLink>
                    </p>
                </div>

            </form>

        </div>
    </div>
    )
};

export default LoginPage;
