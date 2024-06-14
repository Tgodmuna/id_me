import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaSignOutAlt, FaBell, FaTimes } from "react-icons/fa";
import Logo from "../Logo";

const Sidebar: React.FC<{ toggleSideBar: boolean; hideSidebar: () => void }> = ({ toggleSideBar, hideSidebar }) => {
	const location = useLocation();

	return (
		<aside
			className={`bg-gray-800 ${
				toggleSideBar ? " flex" : "hidden"
			}  z-50 text-gray-100 h-screen mr-3 fixed w-[20rem] md:flex flex-col justify-between shadow-xl shadow-black `}
		>
			<div className='p-4 flex flex-col items-start gap-[4rem] h-[57rem]'>
				<FaTimes className={`text-3xl text-white hover:scale-90 mr-2`} onClick={hideSidebar} />
				<h2 className='text-2xl font-bold'>Dashboard</h2>
				<ul className='mt-4 flex flex-col gap-[2rem] bg- w-full h-[45rem]'>
					<li
						className={`flex items-center mb-4 hover:bg-blue-300 p-2 rounded-lg transition-colors duration-300 ${
							location.pathname === "/dashboard"
								? "text-neutral-600 p-2 underline  bg-slate-50"
								: ""
						}`}
					>
						<FaHome className='mr-2' />
						<Link to='/dashboard'>Home</Link>
					</li>
					<li
						className={`flex items-center mb-4 hover:bg-blue-300 p-2 rounded-lg transition-colors duration-300 ${
							location.pathname === "/dashboard/profile"
								? "text-neutral-600 p-2 underline  bg-slate-50"
								: ""
						}`}
					>
						<FaUser className='mr-2' />
						<Link to='/dashboard/profile'>Profile</Link>
					</li>

					<li
						className={`flex items-center mb-4 hover:bg-blue-300 p-2 rounded-lg transition-colors duration-300 ${
							location.pathname === "/logout"
								? "text-neutral-600 p-2 underline  bg-slate-50"
								: ""
						}`}
					>
						<FaSignOutAlt className='mr-2' />
						<Link to='/logout'>Logout</Link>
					</li>
					<li
						className={`flex items-center mb-4 hover:bg-blue-300 p-2 rounded-lg transition-colors duration-300 ${
							location.pathname === "/dashboard/notification"
								? "text-neutral-600 p-2 underline  bg-slate-50"
								: ""
						}`}
					>
						<FaBell className='mr-2' />
						<Link to='/dashboard/notification'>Notification</Link>
					</li>
				</ul>
			</div>
			<div className='p-4'>
				<Logo />
			</div>
		</aside>
	);
};

export default Sidebar;
