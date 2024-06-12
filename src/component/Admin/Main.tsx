// Main.tsx
import React from "react";
import { AiOutlineUser, AiOutlineCheckCircle, AiOutlineMail } from "react-icons/ai";

const Main = () => {
	// Mock data for illustration purposes
	const stats = {
		totalUsers: 1200,
		verifiedUsers: 950,
		emailsSent: 3200,
	};

	return (
		<main className='bg-gray-200 shadow-sm shadow-black w-full max-w-full p-6'>
			<div className='text-2xl font-semibold text-gray-800 mb-6'>Dashboard</div>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				<div className='bg-white p-6 rounded-lg shadow-md flex items-center'>
					<AiOutlineUser className='text-4xl text-blue-500 mr-4' />
					<div>
						<div className='text-xl font-bold'>{stats.totalUsers}</div>
						<div className='text-gray-500'>Total Users</div>
					</div>
				</div>
				<div className='bg-white p-6 rounded-lg shadow-md flex items-center'>
					<AiOutlineCheckCircle className='text-4xl text-green-500 mr-4' />
					<div>
						<div className='text-xl font-bold'>{stats.verifiedUsers}</div>
						<div className='text-gray-500'>Verified Users</div>
					</div>
				</div>
				<div className='bg-white p-6 rounded-lg shadow-md flex items-center'>
					<AiOutlineMail className='text-4xl text-red-500 mr-4' />
					<div>
						<div className='text-xl font-bold'>{stats.emailsSent}</div>
						<div className='text-gray-500'>Emails Sent</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Main;
