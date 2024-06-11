import React, { useEffect } from "react";

interface GenericNotificationProps {
	message: string;
	show: boolean;
	onClose: () => void;
	colorName?:string
}

const GenericNotification: React.FC<GenericNotificationProps> = ({ message, show, onClose, colorName }) => {
	useEffect(() => {
		if (show) {
			const timer = setTimeout(() => {
				onClose();
			}, 4000);
			return () => clearTimeout(timer);
		}
	}, [show, onClose]);

	return (
		<div
			className={`fixed top-0 left-1/2 transform -translate-x-1/2 p-4 ${
				!colorName ? "bg-blue-500" : colorName
			} text-white rounded shadow-md transition-transform duration-300 ${
				show ? "translate-y-0" : "-translate-y-full"
			}`}
		>
			{message}
		</div>
	);
};

export default GenericNotification;
