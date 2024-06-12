import React, { useState } from "react";
import axios from "axios";
import { AiOutlineMail } from "react-icons/ai";

const EmailForm: React.FC = () => {
	const [email, setemail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setSuccess(null);
		setError(null);

		try {
			const data = JSON.stringify({
				email,
				subject,
				message,
			});
			const response = await axios.post(" https://id-me-server.onrender.com/send-email", data);

			if (response.status === 200) {
				setSuccess("Email sent successfully!");
			}
		} catch (err: any) {
			if (err.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				if (err.response.status === 404) {
					setError("User not found.");
				} else if (err.response.status === 500) {
					setError("Error sending email. Please try again later.");
				} else {
					setError("An unexpected error occurred.");
				}
			} else if (err.request) {
				// The request was made but no response was received
				setError("No response received from server.");
			} else {
				// Something happened in setting up the request that triggered an Error
				setError("Error: " + err.message);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='  bg-gray-200 w-full max-w-[70rem] mx-auto p-8 rounded-lg shadow-md relative top-0 bottom-0'>
			<h2 className='text-2xl font-semibold text-gray-800 mb-4 flex items-center'>
				<AiOutlineMail className='mr-2' /> Send Email
			</h2>
			<form className={``} onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label className='block text-gray-700 mb-2' htmlFor='email'>
						User Email
					</label>
					<input
						id='email'
						type='text'
						value={email}
						onChange={(e) => setemail(e.target.value)}
						className='w-full p-2 border border-gray-300 rounded'
						required
					/>
				</div>
				<div className='mb-4'>
					<label className='block text-gray-700 mb-2' htmlFor='subject'>
						Subject
					</label>
					<input
						id='subject'
						type='text'
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						className='w-full p-2 border border-gray-300 rounded'
						required
					/>
				</div>
				<div className='mb-4'>
					<label className='block text-gray-700 mb-2' htmlFor='message'>
						Message
					</label>
					<textarea
						id='message'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						rows={20}
						className='w-full p-2 border border-gray-300 rounded'
						required
					/>
				</div>
				<button
					type='submit'
					className='w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600'
					disabled={loading}
				>
					{loading ? "Sending..." : "Send Email"}
				</button>
			</form>
			{success && <div className='mt-4 text-green-500'>{success}</div>}
			{error && <div className='mt-4 text-red-500'>{error}</div>}
		</div>
	);
};

export default EmailForm;
