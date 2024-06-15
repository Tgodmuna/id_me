import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import React, { useState, useRef } from "react";
import IBAN from "iban";
import axios from "axios";
import CongratulationsCard from "./CongratulationCard";
import { Countrie, countryCodeMap } from "../../hooks/Country";



const Data_Inputs: React.FC = () => {
	const [citizenship, setCitizenship] = useState("");
	const [showFaceCapture, setShowFaceCapture] = useState(false);
	const [showSSN, setShowSSN] = useState(false);
	const [showIBAN, setShowIBAN] = useState(false);
	const [recording, setRecording] = useState(false);
	const [videoURL, setVideoURL] = useState<string | null>(null);
	const [imageURL, setImageURL] = useState<string | null>(null);
	const [phoneError, setPhoneError] = useState<string | null>(null);
	const [ssnError, setSSNError] = useState<string | null>(null);
	const [ibanError, setIBANError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const recordedChunksRef = useRef<Blob[]>([]);
	const [, setshowMessage] = useState(false);
	const [ showCongratulations, setShowCongratulations ] = useState( false );
	

	const handleCitizenshipChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedCitizenship = e.target.value;
		setCitizenship(selectedCitizenship);
		setShowSSN(selectedCitizenship === "United States");
		setShowIBAN(selectedCitizenship === "Germany");
		setShowFaceCapture(selectedCitizenship === "United States");
	};

	const handleStartRecording = async () => {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				videoRef.current.play();
			}
			mediaRecorderRef.current = new MediaRecorder(stream);
			mediaRecorderRef.current.ondataavailable = (event) => {
				if (event.data.size > 0) {
					recordedChunksRef.current.push(event.data);
				}
			};
			mediaRecorderRef.current.onstop = () => {
				const blob = new Blob(recordedChunksRef.current, {
					type: "video/webm",
				});
				setVideoURL(URL.createObjectURL(blob));
				recordedChunksRef.current = [];
			};
			mediaRecorderRef.current.start();
			setRecording(true);
		}
	};

	const handleStopRecording = () => {
		if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
			mediaRecorderRef.current.stop();
			setRecording(false);
		}
		if (videoRef.current && videoRef.current.srcObject) {
			(videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
		}
	};

	const handleCaptureImage = async () => {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });
			const track = stream.getVideoTracks()[0];
			const imageCapture = new (window as any).ImageCapture(track);
			const photo = await imageCapture.takePhoto();
			setImageURL(URL.createObjectURL(photo));
			track.stop();
		} else {
			console.error("ImageCapture API is not supported in this browser.");
		}
	};

	const validatePhoneNumber = (phoneNumber: string, countryCode: CountryCode) => {
		try {
			if (!isValidPhoneNumber(phoneNumber, countryCode)) {
				setPhoneError("Invalid phone number for the selected country.");
				return false;
			}
			setPhoneError(null);
			return true;
		} catch (error) {
			console.error("Error validating phone number:", error);
			setPhoneError("Error validating phone number.");
			return false;
		}
	};

	const validateSSN = (ssn: string) => {
		const ssnPattern = /^\d{3}-\d{2}-\d{4}$/;
		if (!ssnPattern.test(ssn)) {
			setSSNError("Invalid SSN format. Use XXX-XX-XXXX.");
			return false;
		}
		setSSNError(null);
		return true;
	};

	const validateIBAN = (iban: string) => {
		if (!IBAN.isValid(iban)) {
			setIBANError("Invalid IBAN number.");
			return false;
		}
		setIBANError(null);
		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const phoneNumber = formData.get("phoneNumber") as string;
		const ssn = formData.get("ssn") as string;
		const iban = formData.get("iban") as string;

		const countryCode = countryCodeMap[citizenship];

		const stringifyDetails = sessionStorage.getItem("userDetails");
		const parsedUserDetails = stringifyDetails && JSON.parse(stringifyDetails);
		formData.append("userDetails", JSON.stringify(parsedUserDetails));

		if (phoneNumber && !validatePhoneNumber(phoneNumber, countryCode)) return;
		if (ssn && !validateSSN(ssn)) return;
		if (iban && !validateIBAN(iban)) return;

		if (videoURL) {
			const response = await fetch(videoURL);
			const videoBlob = await response.blob();
			formData.append("video", videoBlob, "recording.webm");
		}
		if (imageURL) {
			const response = await fetch(imageURL);
			const imageBlob = await response.blob();
			formData.append("image", imageBlob, "capture.jpg");
		}

		setLoading(true);
		axios.post("https://id-me-server.onrender.com/upload", formData)
			.then((response) => {
				if (response.status === 200) {
					setLoading(false);
					console.log("Files uploaded successfully", response.data);
					setSuccess(true);
					setshowMessage(true);
					setShowCongratulations(true);
				}
			})
			.catch((err) => {
				console.error("Error uploading files", err);
				setError(true);
				setLoading(false);
				setshowMessage(false);
			});
	};

	const handleCloseCongratulations = () => {
		setShowCongratulations(false);
	};

	return (
		<form
			className='bg-white m-auto my-6 mx-4 h-full relative rounded-lg shadow-lg p-6'
			onSubmit={handleSubmit}
		>
			{showCongratulations && <CongratulationsCard onClose={handleCloseCongratulations} />}

			<h2 className='text-2xl font-semibold mb-6 text-gray-800'>Verification Details</h2>
			<div className='flex ga flex-wrap h-auto -mx-3'>
				<div className='mb-6 px-3 w-1/2'>
					<label htmlFor='citizenship' className='block text-sm font-medium text-gray-700 mb-2'>
						Citizenship
					</label>
					<select
						id='citizenship'
						name='citizenship'
						className='w-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm p-2'
						onChange={handleCitizenshipChange}
						value={citizenship}
						required
					>
						<option value=''>Select your country</option>
						{Countrie.map((country) => (
							<option key={country} value={country}>
								{country}
							</option>
						))}
					</select>
				</div>
				<div className='mb-6 px-3 w-1/2'>
					<label htmlFor='firstName' className='block text-sm font-medium text-gray-700 mb-2'>
						First Name
					</label>
					<input
						type='text'
						id='firstName'
						name='firstName'
						className='w-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm p-2'
						placeholder='Enter your first name...'
						required
					/>
				</div>
				<div className='mb-6 px-3 w-1/2'>
					<label htmlFor='lastName' className='block text-sm font-medium text-gray-700 mb-2'>
						Last Name
					</label>
					<input
						type='text'
						id='lastName'
						name='lastName'
						className='w-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm p-2'
						placeholder='Enter your last name...'
						required
					/>
				</div>
				<div className='mb-6 px-3 w-1/2'>
					<label htmlFor='dob' className='block text-sm font-medium text-gray-700 mb-2'>
						Date of Birth
					</label>
					<input
						type='date'
						id='dob'
						name='dob'
						className='w-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm p-2'
						required
					/>
				</div>
				<div className='mb-6 px-3 w-1/2'>
					<label htmlFor='address' className='block text-sm font-medium text-gray-700 mb-2'>
						Address
					</label>
					<input
						type='text'
						id='address'
						name='address'
						className='w-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm p-2'
						placeholder='Enter your address...'
						required
					/>
				</div>
				<div className='mb-6 px-3 w-1/2'>
					<label htmlFor='phoneNumber' className='block text-sm font-medium text-gray-700 mb-2'>
						Phone Number
					</label>
					<input
						type='text'
						id='phoneNumber'
						name='phoneNumber'
						className='w-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm p-2'
						placeholder='Enter your phone number...'
						required
					/>
					{phoneError && <p className='text-red-500 text-sm mt-2'>{phoneError}</p>}
				</div>
				{showSSN && (
					<div className='mb-6 px-3 w-1/2'>
						<label htmlFor='ssn' className='block text-sm font-medium text-gray-700 mb-2'>
							Social Security Number (SSN)
						</label>
						<input
							type='text'
							id='ssn'
							name='ssn'
							className='w-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm p-2'
							placeholder='Enter ssn Use XXX-XX-XXXX'
							required
						/>
						{ssnError && <p className='text-red-500 text-sm mt-2'>{ssnError}</p>}
					</div>
				)}
				<div className='mb-6 px-3 w-1/2'>
					<label htmlFor='document' className='block text-sm font-medium text-gray-700 mb-2'>
						Upload Document (Driver's License/Passport)
					</label>
					<input
						type='file'
						id='document'
						name='document'
						accept='.jpg, .jpeg, .png, .pdf'
						className='w-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm p-2'
					/>
				</div>
				{showFaceCapture && (
					<div className='mb-6 px-3 w-1/2'>
						<label htmlFor='face' className='block text-sm font-medium text-gray-700 mb-2'>
							Face Capture
						</label>
						<p className={`text-red-400 text-sm capitalize`}>
							keep your face closer and direct to the camera to capture well
						</p>
						<div className='flex items-center space-x-4'>
							<button
								type='button'
								className='bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition'
								onClick={recording ? handleStopRecording : handleStartRecording}
							>
								{recording ? "Stop Recording" : "Start Recording"}
							</button>
							{videoURL && (
								<video
									ref={videoRef}
									className='w-48 h-48 rounded-md shadow-md'
									controls
								>
									<source src={videoURL} type='video/webm' />
									Your browser does not support the video tag.
								</video>
							)}
						</div>
					</div>
				)}
				<div className='mb-6 px-3 w-1/2'>
					<label htmlFor='imageCapture' className='block text-sm font-medium text-gray-700 mb-2'>
						Capture Image
					</label>
					<p className={`text-red-400 text-sm capitalize`}>
						keep your face closer and direct to the camera to capture well
					</p>
					<button
						type='button'
						className='bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 transition'
						onClick={handleCaptureImage}
					>
						Capture Image
					</button>
					{imageURL && (
						<img
							src={imageURL}
							alt='Captured'
							className='mt-4 w-48 h-48 rounded-md shadow-md'
						/>
					)}
				</div>
				{showIBAN && (
					<div className='mb-6 px-3 w-1/2'>
						<label htmlFor='iban' className='block text-sm font-medium text-gray-700 mb-2'>
							IBAN Number
						</label>
						<input
							type='text'
							id='iban'
							name='iban'
							className='w-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm p-2'
							placeholder='Enter your IBAN...'
							required
						/>
						{ibanError && <p className='text-red-500 text-sm mt-2'>{ibanError}</p>}
					</div>
				)}
				<div className='w-full px-3'>
					<button
						type='submit'
						className='bg-blue-500 text-white px-6 py-3 rounded-md shadow-sm hover:bg-blue-600 transition w-full'
					>
						{loading ? <p>Loading...</p> : "Submit"};
					</button>
				</div>
			</div>
			{success && <p style={{ color: "green" }}>Form submitted successfully!</p>}
			{error && <p style={{ color: "red" }}>There was an error submitting the form.</p>}
		</form>
	);
};

export default Data_Inputs;
