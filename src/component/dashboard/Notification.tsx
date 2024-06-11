import React, { useState, useEffect } from "react";

const Notification = () => {
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				const response = await fetch("/api/notifications");
				const data = await response.json();
				setNotifications(data);
			} catch (error) {
				console.error("Error fetching notifications:", error);
			}
		};

		fetchNotifications();
	}, []);

	return (
		<div>
			{notifications.length > 0 ? (
				notifications.map((notification, index) => (
					<div key={index}>{(notification as any).message}</div>
				))
			) : (
				<div className={`text-neutral-700 text-2xl capitalize text-center relative top-0 m-auto mt-[17rem] `}>No notifications available</div>
			)}
		</div>
	);
};

export default Notification;
