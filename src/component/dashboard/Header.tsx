import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBell } from "react-icons/fa";

const Header: React.FC = () => {
	return (
		<header className='bg-gray-800 shadow-gray-500 rounded-xl p-4 shadow-md'>
			<div className='container mx-auto flex justify-between items-center'>
				<h1 className='text-white text-2xl font-bold'>Dashboard</h1>
				<nav>
					<ul className='flex space-x-4 text-white'>
						<li>
							<Link to='/profile' className='flex items-center'>
								<FaUserCircle className='mr-1 text-3xl' />
							</Link>
						</li>

						<li>
							<Link to='/notification' className='flex items-center'>
								<FaBell className='mr-1 text-3xl' />
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;