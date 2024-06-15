import React, { useState } from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import DashboardFooter from "./Footer";
import { Link, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
	const [showSideBar, setshowSideBar] = useState<boolean>(false);

	const path = useLocation().pathname;
	const outletsRoutes = ["/dashboard/notification", "/dashboard/profile", "/dashbord", "/dashboard/Verification"];

	const ToggleSidebar = () => {
		setshowSideBar(!showSideBar);
	};

	return (
		<div className={`flex  gap-6 bg-neutral-800`}>
			<Sidebar hideSidebar={ToggleSidebar} toggleSideBar={showSideBar} />
			<div
				className={`flex flex-col m bg-gray-100 p-2 rounded-xl shadow-md shadow-black w-full m-auto md:ml-[19rem]`}
			>
				<Header ToggleSidebar={ToggleSidebar} />
				<div className={`flex flex-col h-screen overflow-scroll overflow-x-hidden`}>
					{outletsRoutes.includes(path) ? <Outlet /> : <WelcomePage />}
				</div>
				<DashboardFooter />
			</div>
		</div>
	);
};

export default Dashboard;

export const WelcomePage: React.FC = () => {
	return (
		<div className='flex flex-col p-3 capitalize items-center m-auto justify-center md:h-[25rem] md:w-[50rem] shadow-lg shadow-black rounded-lg bg-white'>
			<h2 className='text-3xl orbitron font-bold mb-4 text-center text-gray-800'>
				Welcome to Your Dashboard
			</h2>
			<p className='text-lg text-center text-gray-700 mb-8'>
				Explore the power of your dashboard and take control of your data like never before. With
				intuitive features and seamless navigation, get your self{" "}
				<span
					className={`text-xl rounded-lg animate-pulse bg-lime-950 p-2 relative border-black shadow-lg top-1rem] my-3 text-white`}
				>
					verified and certified .
				</span>
			</p>
			<p className='text-lg text-center text-gray-700'>
				Need assistance? Check out our
				<a href='/help' className='text-blue-600 hover:underline'>
					help section
				</a>{" "}
				for tutorials and FAQs, or{" "}
				<a href='/contact' className='text-blue-600 hover:underline'>
					contact us
				</a>{" "}
				for personalized support.
			</p>

			<div className='flex flex-col items-center justify-center mt-8'>
				<p className='text-lg text-gray-700 mb-4'>
					To start the verification process, please navigate to the Verification page.
				</p>
				<Link
					to='/dashboard/Verification'
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				>
					Go to Verification
				</Link>
			</div>
		</div>
	);
};
