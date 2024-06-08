import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LogIn: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

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
			const response = await axios.post("http://localhost:5000/login", { email, password });
			localStorage.setItem("token", response.data.token);
			setSuccess("User logged in successfully!");
		} catch (err) {
			setError("Error logging in. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div
			className='flex justify-center items-center h-screen bg-cover bg-no-repeat bg-center'
			style={{
				backgroundImage: "url('https://source.unsplash.com/random/1600x900/?tech')",
			}}
		>
			<div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
				<h2 className='text-3xl font-bold mb-4 text-center'>Welcome Back!</h2>
				<p className='text-gray-600 mb-6 text-center'>Log in to your account</p>
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
