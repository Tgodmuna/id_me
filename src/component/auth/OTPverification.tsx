import React, { useEffect, useRef, useState } from "react";
import GenericNotification from "./Notification";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OtpVerification: React.FC = () => {
	const [otp, setOtp] = useState("");
	const otpid = useRef<string | null>(null);
	const [message, setmessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [ShowNotification, setShowNotification] = useState(false);
	const navigate = useNavigate();

	const verifyRef = useRef<HTMLButtonElement | null>(null);
	useEffect(() => {
		if (otp !== "" && verifyRef.current) {
			verifyRef.current.disabled = false;
			verifyRef.current.style.backgroundColor = "#27ae60";
			verifyRef.current.style.color = "#fff";
			verifyRef.current.style.border = "1px solid #27ae60";
			verifyRef.current.style.cursor = "pointer";
			verifyRef.current.style.pointerEvents = "auto";
			verifyRef.current.style.opacity = "1";
			verifyRef.current.style.transition = "all 0.3s ease";
			verifyRef.current.style.transform = "scale(1)";
			verifyRef.current.style.margin = "0px";
		} else if (isLoading && verifyRef.current) {
			verifyRef.current.disabled = true;
			verifyRef.current.style.backgroundColor = "#27ae60";
			verifyRef.current.style.color = "#fff";
			verifyRef.current.style.border = "1px solid #27ae60";
			verifyRef.current.style.pointerEvents = "none";
			verifyRef.current.style.opacity = "1";
		} else {
			verifyRef.current && (verifyRef.current.disabled = true);
			verifyRef.current && (verifyRef.current.style.backgroundColor = "#ccc");
			verifyRef.current && (verifyRef.current.style.color = "#fff");
			verifyRef.current && (verifyRef.current.style.border = "1px solid #27ae60");
			verifyRef.current && (verifyRef.current.style.cursor = "not-allowed");
			verifyRef.current && (verifyRef.current.style.pointerEvents = "auto");
			verifyRef.current && (verifyRef.current.style.opacity = "1");
		}
	}, [isLoading, otp]);

	useEffect(() => {
		otpid.current = sessionStorage.getItem("otpid");
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOtp(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		console.log(otpid);
		const data = { otp: otp, otpid: otpid.current };
		console.log(data);
		axios.post("https://id-me-server.onrender.com/verify-otp", JSON.stringify(data), {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		})
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					console.log(response);
					setShowNotification(true);
					setIsLoading(false);
					sessionStorage.clear();
					setmessage(response.data.message);
					setTimeout(() => {
						navigate("/login");
					}, 3000);
				}
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
				setShowNotification(true);
				setmessage(error.response.data.message);
			});
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<form className='bg-white p-6 rounded shadow-md w-full max-w-sm' onSubmit={handleSubmit}>
				<h2 className='text-2xl font-bold mb-4'>Enter OTP</h2>
				<p className={`text-xs text-neutral-600 capitalize`}>OTP recieved via registered Email</p>
				<input
					type='text'
					value={otp}
					onChange={handleChange}
					className='w-full p-2 border border-gray-300 rounded mb-4'
					placeholder='Enter OTP'
				/>
				<button ref={verifyRef} type='submit' className={` w-full bg-blue-500 text-white p-2 rounded`}>
					{isLoading ? (
						<div className='flex justify-center items-center' role='status' aria-hidden='true'>
							<div className='animate-spin border self-center border-dotted p-2 m-auto rounded-full border-black h-5 w-5 text-white'>
								<div
									className={`rounded-full w-auto h-auto p-2 m-auto border-2 border-green-500`}
								></div>
							</div>
						</div>
					) : (
						"verify OTP"
					)}
				</button>
			</form>

			<GenericNotification
				message={message}
				onClose={() => {
					setShowNotification(false);
				}}
				show={ShowNotification}
			/>
		</div>
	);
};

export default OtpVerification;


