import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import React, { useState, useRef } from "react";
import IBAN from "iban";
import axios from "axios";
import CongratulationsCard from "./CongratulationCard";

const countries = [
	"Afghanistan",
	"Albania",
	"Algeria",
	"Andorra",
	"Angola",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bhutan",
	"Bolivia",
	"Bosnia and Herzegovina",
	"Botswana",
	"Brazil",
	"Brunei",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Central African Republic",
	"Chad",
	"Chile",
	"China",
	"Colombia",
	"Comoros",
	"Congo, Democratic Republic of the",
	"Congo, Republic of the",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Cyprus",
	"Czech Republic",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic",
	"East Timor",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Eswatini",
	"Ethiopia",
	"Fiji",
	"Finland",
	"France",
	"Gabon",
	"Gambia",
	"Georgia",
	"Germany",
	"Ghana",
	"Greece",
	"Grenada",
	"Guatemala",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Honduras",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran",
	"Iraq",
	"Ireland",
	"Israel",
	"Italy",
	"Ivory Coast",
	"Jamaica",
	"Japan",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Korea, North",
	"Korea, South",
	"Kosovo",
	"Kuwait",
	"Kyrgyzstan",
	"Laos",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands",
	"Mauritania",
	"Mauritius",
	"Mexico",
	"Micronesia",
	"Moldova",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands",
	"New Zealand",
	"Nicaragua",
	"Niger",
	"Nigeria",
	"North Macedonia",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines",
	"Poland",
	"Portugal",
	"Qatar",
	"Romania",
	"Russia",
	"Rwanda",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan",
	"Suriname",
	"Sweden",
	"Switzerland",
	"Syria",
	"Taiwan",
	"Tajikistan",
	"Tanzania",
	"Thailand",
	"Togo",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates",
	"United Kingdom",
	"United States",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Vatican City",
	"Venezuela",
	"Vietnam",
	"Yemen",
	"Zambia",
	"Zimbabwe",
];

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
	// const [message, setmessage] = useState("");
	const [, setshowMessage] = useState(false);
	const [showCongratulations, setShowCongratulations] = useState(false);

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

		const countryCodeMap: { [key: string]: CountryCode } = {
			Afghanistan: "AF",
			Albania: "AL",
			Algeria: "DZ",
			Andorra: "AD",
			Angola: "AO",
			"Antigua and Barbuda": "AG",
			Argentina: "AR",
			Armenia: "AM",
			Australia: "AU",
			Austria: "AT",
			Azerbaijan: "AZ",
			Bahamas: "BS",
			Bahrain: "BH",
			Bangladesh: "BD",
			Barbados: "BB",
			Belarus: "BY",
			Belgium: "BE",
			Belize: "BZ",
			Benin: "BJ",
			Bhutan: "BT",
			Bolivia: "BO",
			"Bosnia and Herzegovina": "BA",
			Botswana: "BW",
			Brazil: "BR",
			Brunei: "BN",
			Bulgaria: "BG",
			"Burkina Faso": "BF",
			Burundi: "BI",
			"Cabo Verde": "CV",
			Cambodia: "KH",
			Cameroon: "CM",
			Canada: "CA",
			"Central African Republic": "CF",
			Chad: "TD",
			Chile: "CL",
			China: "CN",
			Colombia: "CO",
			Comoros: "KM",
			"Congo, Democratic Republic of the": "CD",
			"Congo, Republic of the": "CG",
			"Costa Rica": "CR",
			Croatia: "HR",
			Cuba: "CU",
			Cyprus: "CY",
			"Czech Republic": "CZ",
			Denmark: "DK",
			Djibouti: "DJ",
			Dominica: "DM",
			"Dominican Republic": "DO",
			"East Timor": "TL",
			Ecuador: "EC",
			Egypt: "EG",
			"El Salvador": "SV",
			"Equatorial Guinea": "GQ",
			Eritrea: "ER",
			Estonia: "EE",
			Eswatini: "SZ",
			Ethiopia: "ET",
			Fiji: "FJ",
			Finland: "FI",
			France: "FR",
			Gabon: "GA",
			Gambia: "GM",
			Georgia: "GE",
			Germany: "DE",
			Ghana: "GH",
			Greece: "GR",
			Grenada: "GD",
			Guatemala: "GT",
			Guinea: "GN",
			"Guinea-Bissau": "GW",
			Guyana: "GY",
			Haiti: "HT",
			Honduras: "HN",
			Hungary: "HU",
			Iceland: "IS",
			India: "IN",
			Indonesia: "ID",
			Iran: "IR",
			Iraq: "IQ",
			Ireland: "IE",
			Israel: "IL",
			Italy: "IT",
			"Ivory Coast": "CI",
			Jamaica: "JM",
			Japan: "JP",
			Jordan: "JO",
			Kazakhstan: "KZ",
			Kenya: "KE",
			Kiribati: "KI",
			"Korea, North": "KP",
			"Korea, South": "KR",
			Kosovo: "XK",
			Kuwait: "KW",
			Kyrgyzstan: "KG",
			Laos: "LA",
			Latvia: "LV",
			Lebanon: "LB",
			Lesotho: "LS",
			Liberia: "LR",
			Libya: "LY",
			Liechtenstein: "LI",
			Lithuania: "LT",
			Luxembourg: "LU",
			Madagascar: "MG",
			Malawi: "MW",
			Malaysia: "MY",
			Maldives: "MV",
			Mali: "ML",
			Malta: "MT",
			"Marshall Islands": "MH",
			Mauritania: "MR",
			Mauritius: "MU",
			Mexico: "MX",
			Micronesia: "FM",
			Moldova: "MD",
			Monaco: "MC",
			Mongolia: "MN",
			Montenegro: "ME",
			Morocco: "MA",
			Mozambique: "MZ",
			Myanmar: "MM",
			Namibia: "NA",
			Nauru: "NR",
			Nepal: "NP",
			Netherlands: "NL",
			"New Zealand": "NZ",
			Nicaragua: "NI",
			Niger: "NE",
			Nigeria: "NG",
			"North Macedonia": "MK",
			Norway: "NO",
			Oman: "OM",
			Pakistan: "PK",
			Palau: "PW",
			Palestine: "PS",
			Panama: "PA",
			"Papua New Guinea": "PG",
			Paraguay: "PY",
			Peru: "PE",
			Philippines: "PH",
			Poland: "PL",
			Portugal: "PT",
			Qatar: "QA",
			Romania: "RO",
			Russia: "RU",
			Rwanda: "RW",
			"Saint Kitts and Nevis": "KN",
			"Saint Lucia": "LC",
			"Saint Vincent and the Grenadines": "VC",
			Samoa: "WS",
			"San Marino": "SM",
			"Sao Tome and Principe": "ST",
			"Saudi Arabia": "SA",
			Senegal: "SN",
			Serbia: "RS",
			Seychelles: "SC",
			"Sierra Leone": "SL",
			Singapore: "SG",
			Slovakia: "SK",
			Slovenia: "SI",
			"Solomon Islands": "SB",
			Somalia: "SO",
			"South Africa": "ZA",
			"South Sudan": "SS",
			Spain: "ES",
			"Sri Lanka": "LK",
			Sudan: "SD",
			Suriname: "SR",
			Sweden: "SE",
			Switzerland: "CH",
			Syria: "SY",
			Taiwan: "TW",
			Tajikistan: "TJ",
			Tanzania: "TZ",
			Thailand: "TH",
			Togo: "TG",
			Tonga: "TO",
			"Trinidad and Tobago": "TT",
			Tunisia: "TN",
			Turkey: "TR",
			Turkmenistan: "TM",
			Tuvalu: "TV",
			Uganda: "UG",
			Ukraine: "UA",
			"United Arab Emirates": "AE",
			"United Kingdom": "GB",
			"United States": "US",
			Uruguay: "UY",
			Uzbekistan: "UZ",
			Vanuatu: "VU",
			"Vatican City": "VA",
			Venezuela: "VE",
			Vietnam: "VN",
			Yemen: "YE",
			Zambia: "ZM",
			Zimbabwe: "ZW",
		};

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
					setShowCongratulations(true); // Show congratulations card
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
						{countries.map((country) => (
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
