// NotificationForm.tsx
import React, { useState } from "react";
import axios from "axios";
import { AiOutlineNotification } from "react-icons/ai";

const NotificationForm: React.FC = () => {
	const [userId, setUserId] = useState("");
	const [notification, setNotification] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setSuccess(null);
		setError(null);

		try {
			const response = await axios.post("/send-notification", {
				userId,
				notification,
			});

			if (response.status === 200) {
				setSuccess("Notification sent successfully!");
			}
		} catch (err: any) {
			if (err.response) {
				if (err.response.status === 404) {
					setError("User not found.");
				} else if (err.response.status === 500) {
					setError("Error sending notification. Please try again later.");
				} else {
					setError("An unexpected error occurred.");
				}
			} else if (err.request) {
				setError("No response received from server.");
			} else {
				setError("Error: " + err.message);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='bg-gray-300 w-full max-w-[50rem] mx-auto p-8 rounded-lg shadow-md'>
			<h2 className='text-2xl font-semibold text-gray-800 mb-4 flex items-center'>
				<AiOutlineNotification className='mr-2' /> Send Notification
			</h2>
			<form onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label className='block text-gray-700 mb-2' htmlFor='userId'>
						User ID
					</label>
					<input
						id='userId'
						type='text'
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
						className='w-full p-2 border border-gray-300 rounded'
						required
					/>
				</div>
				<div className='mb-4'>
					<label className='block text-gray-700 mb-2' htmlFor='notification'>
						Notification Body
					</label>
					<textarea
						id='notification'
						value={notification}
						onChange={(e) => setNotification(e.target.value)}
						className='w-full p-2 border border-gray-300 rounded'
						required
					/>
				</div>
				<button
					type='submit'
					className='w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600'
					disabled={loading}
				>
					{loading ? "Sending..." : "Send Notification"}
				</button>
			</form>
			{success && <div className='mt-4 text-green-500'>{success}</div>}
			{error && <div className='mt-4 text-red-500'>{error}</div>}
		</div>
	);
};

export default NotificationForm;
