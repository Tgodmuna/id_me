import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBell, FaBars } from "react-icons/fa";

const Header: React.FC<{ ToggleSidebar: () => void }> = ({ ToggleSidebar }) => {
	return (
		<header className='bg-inherit shadow-gray-500 rounded-xl p-4 shadow-md'>
			<div className='container mx-auto flex justify-between items-center'>
				<FaBars onClick={() => ToggleSidebar()} className={`text-3xl md:hidden block text-gray-800`} />
				<Link to={"/dashboard"} className=' text-4xl orbitron text-gray-800 font-bold'>
					Dashboard
				</Link>
				<nav>
					<ul className='flex space-x-4 text-white'>
						<li>
							<Link to='/profile' className='flex items-center'>
								<FaUserCircle className='mr-1 text-3xl text-gray-800 hover:scale-110' />
							</Link>
						</li>

						<li>
							<Link to='/notification' className='flex items-center'>
								<FaBell className='mr-1 text-3xl text-gray-800 hover:scale-110' />
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
