// Sidebar.tsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineNotification, AiOutlineMail, AiOutlineBarChart } from "react-icons/ai";

const Sidebar: React.FC = () => {
	const location = useLocation();
	const [activeTab, setActiveTab] = useState(location.pathname);

	useEffect(() => {
		setActiveTab(location.pathname);
	}, [location.pathname]);

	const menuItems = [
		{ path: "/admin/users", label: "View Users", icon: <AiOutlineUser className='mr-2' /> },
		{ path: "/admin/notifyUser", label: "Send Notification", icon: <AiOutlineNotification className='mr-2' /> },
		{ path: "/admin/send-emails", label: "Send Email", icon: <AiOutlineMail className='mr-2' /> },
		{ path: "/admin/userData", label: " Manage Users", icon: <AiOutlineBarChart className='mr-2' /> },
	];

	const navigate = useNavigate();

	return (
		<div className='bg-gray-800 w-64 h-screen flex flex-col justify-between p-2'>
			<h1
				onClick={() => {
					navigate("/admin");
				}}
				className={`2xl text-neutral-400 uppercase font-bold text-center bg-white hover:text-gray-800 cursor-pointer p-2 rounded-lg`}
			>
				dashboard
			</h1>
			<div className='mt-8 bg-gray-600 rounded-3xl h-[40rem] p-1'>
				<ul className='flex h-full justify-between flex-col space-y-2 p-2'>
					{menuItems.map((item) => (
						<li key={item.path}>
							<Link
								to={item.path}
								onClick={() => setActiveTab(item.path)}
								className={`flex items-center p-2 rounded transition-colors duration-200 ${
									activeTab === item.path
										? "bg-gray-700 text-white"
										: "text-gray-400 hover:bg-gray-700 hover:text-white"
								}`}
							>
								{item.icon}
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div className='text-center text-gray-400 p-4'>© 2024 Admin Dashboard</div>
		</div>
	);
};

export default Sidebar;
