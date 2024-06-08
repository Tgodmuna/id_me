import React from "react";

const DashboardFooter: React.FC = () => {
	return (
		<footer className='bg-gray-200 p-4 text-center'>
			<p className='text-gray-600 text-sm orbitron'>
				&copy; {new Date().getFullYear()} Verificationboard. All rights reserved.
			</p>
		</footer>
	);
};

export default DashboardFooter;
