import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const INDEX = () => {
	return (
		<div
			about={"Landing page for the Verificationboard app."}
		>
			<Header />
			<LandingPage />
			<Footer />
		</div>
	);
};

export default INDEX;

const Header: React.FC = () => {
	return (
		<header className='bg-gray-800 text-white p-4 shadow-md'>
			<nav className='container mx-auto flex justify-between items-center'>
				<Link to='/' className='flex items-center'>
					<Logo />
				</Link>
				<div>
					<Link to='/' className='mr-4 hover:underline'>
						Home
					</Link>
					<Link to='/about' className='mr-4 hover:underline'>
						About
					</Link>
					<Link to='/login' className='mr-4 hover:underline'>
						Login
					</Link>
					<Link to='/register' className='hover:underline'>
						Sign Up
					</Link>
				</div>
			</nav>
		</header>
	);
};

const Footer: React.FC = () => {
	return (
		<footer className='bg-gray-800 text-white p-4 mt-auto'>
			<div className='container mx-auto text-center'>
				&copy; 2023 User Data Collection. All rights reserved.
			</div>
		</footer>
	);
};

const LandingPage: React.FC = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-light text-dark'>
			<div className='max-w-2xl text-center p-6 bg-gray-800 shadow-lg rounded-lg'>
				<h1 className='text-5xl font-bold text-white mb-6 dancing-script '>
					Welcome to Verificationboard
				</h1>
				<p className='text-lg text-gray-200 mb-6'>
					Experience a seamless and secure way to manage user data with our platform. Sign up today
					to get started or log in to access your account.
				</p>
				<div className='flex justify-center'>
					<Link
						to='/register'
						className='bg-primary text-white orbitron py-2 px-6 rounded-lg l mr-4 hover:bg-secondary transition duration-300'
					>
						Sign Up
					</Link>
					<Link
						to='/login'
						className='bg-secondary orbitron text-white py-2 px-6 rounded-lg hover:bg-primary transition duration-300'
					>
						Log In
					</Link>
				</div>
			</div>
		</div>
	);
};
