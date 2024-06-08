import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:5000/register", { username, email, password });
			alert("User registered");
		} catch (err) {
			alert("Error registering user");
		}
	};

	return (
		<div
			className='flex w-full justify-center items-center h-screen bg-cover bg-no-repeat bg-center'
			style={{
				backgroundImage: "url('https://source.unsplash.com/random/1600x900/?nature')",
			}}
		>
			<div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
				<h2 className='text-3xl font-bold mb-4 text-center'>Join Us!</h2>
				<p className='text-gray-600 mb-6 text-center'>Create an account</p>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						placeholder='Username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className='w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
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
					>
						Sign Up
					</button>
				</form>
				<div className='mt-4 text-center'>
					<Link to='/login' className='text-blue-600 hover:underline'>
						Already have an account? Log In
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
