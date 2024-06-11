import React, { useEffect } from "react";

const CongratulationsCard = ({ onClose }: { onClose: () => void }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 15000);

		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<div className='absolute  top-0 left-0 w-full h-full flex justify-center items-center'>
			<div className='bg-green-200 w-[40rem] h-[10rem] border-green-600 text-green-600 border-l-4 p-4 rounded-md shadow-lg'>
				<p className='font-bold'>Congratulations!</p>
				<p>Your verification was successful.</p>
				<p>email will be sent to you regarding your verification status</p>
				<p>after certificate will be issued to you</p>
				<p>which you can use any around the world any system</p>
			</div>
		</div>
	);
};

export default CongratulationsCard;
