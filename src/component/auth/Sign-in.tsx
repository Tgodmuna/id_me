import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LogIn: React.FC<{ extractor?: (token: string) => void }> = ({ extractor }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		if (!email || !password) {
			setError("Please enter both email and password.");
			return;
		}

		setIsLoading(true);

		try {
			const response = await axios.post("https://id-me-server.onrender.com/login", { email, password });

			if (response.status === 200) {
				setEmail("");
				setPassword("");
				sessionStorage.setItem("token", response.data.token);
				if (extractor) {
					extractor(response.data.token);
				}
				setTimeout(() => {
					navigate("/dashboard");
				}, 2000);
				setSuccess("User logged in successfully!");
				const UserDetails = JSON.stringify(response.data.user);
				sessionStorage.setItem("userDetails", UserDetails);
			}
		} catch (err: any) {
			if (err.response && err.response.data && err.response.data.message) {
				// Server error
				setError(err.response.data.message);
			} else {
				// Natural error or generic server error
				setError("An error occurred. Please try again later.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex bg-gray-800 justify-center items-center h-screen bg-cover bg-no-repeat bg-center p-4'>
			<div className='bg-white p-8 rounded-lg shadow-lg shadow-neutral-500 w-full max-w-[50rem]'>
				<h2 className='text-3xl font-bold mb-4 text-center'>Welcome Back!</h2>
				<p className='text-gray-600 mb-6 text-center'>Log in to your account </p>
				{error && <p className='text-red-500 mb-4 text-center'>{error}</p>}
				{success && <p className='text-green-500 mb-4 text-center'>{success}</p>}
				<form onSubmit={handleSubmit}>
					<input
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
					<input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
					<button
						type='submit'
						className='w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200'
						disabled={isLoading}
					>
						{isLoading ? "Loading..." : "Log In"}
					</button>
				</form>
				<div className='mt-4 text-center'>
					<Link to='/signup' className='text-blue-600 hover:underline'>
						Create an account
					</Link>
				</div>
				<div className='mt-2 text-center'>
					<Link to='/reset-password' className='text-blue-600 hover:underline'>
						Forgot password?
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LogIn;
