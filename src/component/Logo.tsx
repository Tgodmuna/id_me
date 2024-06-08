import React from "react";
import { IoShieldCheckmark } from "react-icons/io5";

const Logo: React.FC = () => {
	return (
		<div className='flex items-center'>
			<IoShieldCheckmark className='text-white text-5xl mr-2' />
			<div className={`flex flex-col justify-center`}>
				<h1 className='text-2xl orbitron font-bold'>Verificationboard</h1>
				<p className='text-sm text-neutral-600'>Trust and Verification</p>
			</div>
		</div>
	);
};

export default Logo;
