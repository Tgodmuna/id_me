import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp: React.FC = () => {
	const [fullname, setfullname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [country, setCountry] = useState("");
	const [language, setlanguage] = useState("");
	const [message, setmessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			console.log(JSON.stringify({ fullname, email, password, country, language }));
			const response = await axios.post(
				"http://localhost:7000/register",
				JSON.stringify({ fullname, email, password, country, language }),
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (response.status === 200) {
				console.log(response);
				setIsLoading(false);
				const data = response.data;
				sessionStorage.setItem("otpid", data.otpid);
				setmessage(data.text);
				setTimeout(() => {
					navigate("/otp-verification");
				}, 5000);
			}
		} catch (err: any) {
			setIsLoading(false);

			// Check if the error is an Axios error
			if (axios.isAxiosError(err)) {
				if (err.response) {
					// Server responded with a status other than 2xx
					if (err.response.status === 400) {
						setmessage(err.response.data.message);
						return;
					} else {
						// Handle other status codes
						setmessage(`Error: ${err.response.status}`);
					}
				} else if (err.request) {
					// Request was made but no response was received
					setmessage("No response received from the server.");
				} else {
					// Something happened in setting up the request
					setmessage(`Error in setting up the request: ${err.message}`);
				}
			} else {
				// Handle non-Axios errors
				setmessage(err.message);
			}

			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};


	const BTNRef = useRef<HTMLButtonElement | null>(null);
	useEffect(() => {
		if (isLoading && BTNRef.current) {
			BTNRef.current.disabled = true;
			BTNRef.current.style.backgroundColor = "#ccc";
			BTNRef.current.style.color = "#666";
			BTNRef.current.style.border = "1px solid #ccc";
			BTNRef.current.style.cursor = "not-allowed";
		} else if (fullname !== "" && email !== "" && password !== "" && country !== "" && language !== "") {
			BTNRef.current && (BTNRef.current.disabled = false);
			BTNRef.current && (BTNRef.current.style.backgroundColor = "#27ae60");
			BTNRef.current && (BTNRef.current.style.color = "#fff");
			BTNRef.current && (BTNRef.current.style.border = "1px solid #27ae60");
			BTNRef.current && (BTNRef.current.style.cursor = "pointer");
		} else {
			BTNRef.current && (BTNRef.current.disabled = true);
			BTNRef.current && (BTNRef.current.style.backgroundColor = "#ccc");
			BTNRef.current && (BTNRef.current.style.color = "#666");
			BTNRef.current && (BTNRef.current.style.border = "1px solid #ccc");
			BTNRef.current && (BTNRef.current.style.cursor = "not-allowed");
		}
	}, [isLoading, fullname, email, password, country, language]);

	return (
		<div
			className='flex w-full bg-gray-800 justify-center items-center h-screen bg-cover bg-no-repeat bg-center'
			style={{
				backgroundImage: "url('https://source.unsplash.com/random/1600x900/?nature')",
			}}
		>
			<div className='bg-white p-8 rounded-lg sha shadow-lg shadow-neutral-400 w-full max-w-[50rem]'>
				<h2 className='text-3xl capitalize font-bold mb-4 text-center'>
					verify me across every system!
				</h2>
				<p className='text-gray-600 mb-6 text-center'>Create an account</p>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						placeholder='fullname'
						value={fullname}
						onChange={(e) => setfullname(e.target.value)}
						className='w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
					<input
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
					<input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
					<label id={"country"}>
						<select
							id={"country"}
							value={country}
							onChange={(e) => setCountry(e.target.value)}
							className='w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
						>
							<option value=''>Select Country</option>
							<option value='Afghanistan'>Afghanistan</option>
							<option value='Albania'>Albania</option>
							<option value='Algeria'>Algeria</option>
							<option value='Andorra'>Andorra</option>
							<option value='Angola'>Angola</option>
							<option value='Antigua and Barbuda'>Antigua and Barbuda</option>
							<option value='Argentina'>Argentina</option>
							<option value='Armenia'>Armenia</option>
							<option value='Australia'>Australia</option>
							<option value='Austria'>Austria</option>
							<option value='Azerbaijan'>Azerbaijan</option>
							<option value='Bahamas'>Bahamas</option>
							<option value='Bahrain'>Bahrain</option>
							<option value='Bangladesh'>Bangladesh</option>
							<option value='Barbados'>Barbados</option>
							<option value='Belarus'>Belarus</option>
							<option value='Belgium'>Belgium</option>
							<option value='Belize'>Belize</option>
							<option value='Benin'>Benin</option>
							<option value='Bhutan'>Bhutan</option>
							<option value='Bolivia'>Bolivia</option>
							<option value='Bosnia and Herzegovina'>Bosnia and Herzegovina</option>
							<option value='Botswana'>Botswana</option>
							<option value='Brazil'>Brazil</option>
							<option value='Brunei'>Brunei</option>
							<option value='Bulgaria'>Bulgaria</option>
							<option value='Burkina Faso'>Burkina Faso</option>
							<option value='Burundi'>Burundi</option>
							<option value='Cabo Verde'>Cabo Verde</option>
							<option value='Cambodia'>Cambodia</option>
							<option value='Cameroon'>Cameroon</option>
							<option value='Canada'>Canada</option>
							<option value='Central African Republic'>Central African Republic</option>
							<option value='Chad'>Chad</option>
							<option value='Chile'>Chile</option>
							<option value='China'>China</option>
							<option value='Colombia'>Colombia</option>
							<option value='Comoros'>Comoros</option>
							<option value='Congo, Democratic Republic of the'>
								Congo, Democratic Republic of the
							</option>
							<option value='Congo, Republic of the'>Congo, Republic of the</option>
							<option value='Costa Rica'>Costa Rica</option>
							<option value='Croatia'>Croatia</option>
							<option value='Cuba'>Cuba</option>
							<option value='Cyprus'>Cyprus</option>
							<option value='Czech Republic'>Czech Republic</option>
							<option value='Denmark'>Denmark</option>
							<option value='Djibouti'>Djibouti</option>
							<option value='Dominica'>Dominica</option>
							<option value='Dominican Republic'>Dominican Republic</option>
							<option value='East Timor'>East Timor</option>
							<option value='Ecuador'>Ecuador</option>
							<option value='Egypt'>Egypt</option>
							<option value='El Salvador'>El Salvador</option>
							<option value='Equatorial Guinea'>Equatorial Guinea</option>
							<option value='Eritrea'>Eritrea</option>
							<option value='Estonia'>Estonia</option>
							<option value='Eswatini'>Eswatini</option>
							<option value='Ethiopia'>Ethiopia</option>
							<option value='Fiji'>Fiji</option>
							<option value='Finland'>Finland</option>
							<option value='France'>France</option>
							<option value='Gabon'>Gabon</option>
							<option value='Gambia'>Gambia</option>
							<option value='Georgia'>Georgia</option>
							<option value='Germany'>Germany</option>
							<option value='Ghana'>Ghana</option>
							<option value='Greece'>Greece</option>
							<option value='Grenada'>Grenada</option>
							<option value='Guatemala'>Guatemala</option>
							<option value='Guinea'>Guinea</option>
							<option value='Guinea-Bissau'>Guinea-Bissau</option>
							<option value='Guyana'>Guyana</option>
							<option value='Haiti'>Haiti</option>
							<option value='Honduras'>Honduras</option>
							<option value='Hungary'>Hungary</option>
							<option value='Iceland'>Iceland</option>
							<option value='India'>India</option>
							<option value='Indonesia'>Indonesia</option>
							<option value='Iran'>Iran</option>
							<option value='Iraq'>Iraq</option>
							<option value='Ireland'>Ireland</option>
							<option value='Israel'>Israel</option>
							<option value='Italy'>Italy</option>
							<option value='Jamaica'>Jamaica</option>
							<option value='Japan'>Japan</option>
							<option value='Jordan'>Jordan</option>
							<option value='Kazakhstan'>Kazakhstan</option>
							<option value='Kenya'>Kenya</option>
							<option value='Kiribati'>Kiribati</option>
							<option value='Korea, North'>Korea, North</option>
							<option value='Korea, South'>Korea, South</option>
							<option value='Kosovo'>Kosovo</option>
							<option value='Kuwait'>Kuwait</option>
							<option value='Kyrgyzstan'>Kyrgyzstan</option>
							<option value='Laos'>Laos</option>
							<option value='Latvia'>Latvia</option>
							<option value='Lebanon'>Lebanon</option>
							<option value='Lesotho'>Lesotho</option>
							<option value='Liberia'>Liberia</option>
							<option value='Libya'>Libya</option>
							<option value='Liechtenstein'>Liechtenstein</option>
							<option value='Lithuania'>Lithuania</option>
							<option value='Luxembourg'>Luxembourg</option>
							<option value='Madagascar'>Madagascar</option>
							<option value='Malawi'>Malawi</option>
							<option value='Malaysia'>Malaysia</option>
							<option value='Maldives'>Maldives</option>
							<option value='Mali'>Mali</option>
							<option value='Malta'>Malta</option>
							<option value='Marshall Islands'>Marshall Islands</option>
							<option value='Mauritania'>Mauritania</option>
							<option value='Mauritius'>Mauritius</option>
							<option value='Mexico'>Mexico</option>
							<option value='Micronesia'>Micronesia</option>
							<option value='Moldova'>Moldova</option>
							<option value='Monaco'>Monaco</option>
							<option value='Mongolia'>Mongolia</option>
							<option value='Montenegro'>Montenegro</option>
							<option value='Morocco'>Morocco</option>
							<option value='Mozambique'>Mozambique</option>
							<option value='Myanmar'>Myanmar</option>
							<option value='Namibia'>Namibia</option>
							<option value='Nauru'>Nauru</option>
							<option value='Nepal'>Nepal</option>
							<option value='Netherlands'>Netherlands</option>
							<option value='New Zealand'>New Zealand</option>
							<option value='Nicaragua'>Nicaragua</option>
							<option value='Niger'>Niger</option>
							<option value='Nigeria'>Nigeria</option>
							<option value='North Macedonia'>North Macedonia</option>
							<option value='Norway'>Norway</option>
							<option value='Oman'>Oman</option>
							<option value='Pakistan'>Pakistan</option>
							<option value='Palau'>Palau</option>
							<option value='Palestine'>Palestine</option>
							<option value='Panama'>Panama</option>
							<option value='Papua New Guinea'>Papua New Guinea</option>
							<option value='Paraguay'>Paraguay</option>
							<option value='Peru'>Peru</option>
							<option value='Philippines'>Philippines</option>
							<option value='Poland'>Poland</option>
							<option value='Portugal'>Portugal</option>
							<option value='Qatar'>Qatar</option>
							<option value='Romania'>Romania</option>
							<option value='Russia'>Russia</option>
							<option value='Rwanda'>Rwanda</option>
							<option value='Saint Kitts and Nevis'>Saint Kitts and Nevis</option>
							<option value='Saint Lucia'>Saint Lucia</option>
							<option value='Saint Vincent and the Grenadines'>
								Saint Vincent and the Grenadines
							</option>
							<option value='Samoa'>Samoa</option>
							<option value='San Marino'>San Marino</option>
							<option value='Sao Tome and Principe'>Sao Tome and Principe</option>
							<option value='Saudi Arabia'>Saudi Arabia</option>
							<option value='Senegal'>Senegal</option>
							<option value='Serbia'>Serbia</option>
							<option value='Seychelles'>Seychelles</option>
							<option value='Sierra Leone'>Sierra Leone</option>
							<option value='Singapore'>Singapore</option>
							<option value='Slovakia'>Slovakia</option>
							<option value='Slovenia'>Slovenia</option>
							<option value='Solomon Islands'>Solomon Islands</option>
							<option value='Somalia'>Somalia</option>
							<option value='South Africa'>South Africa</option>
							<option value='South Sudan'>South Sudan</option>
							<option value='Spain'>Spain</option>
							<option value='Sri Lanka'>Sri Lanka</option>
							<option value='Sudan'>Sudan</option>
							<option value='Suriname'>Suriname</option>
							<option value='Sweden'>Sweden</option>
							<option value='Switzerland'>Switzerland</option>
							<option value='Syria'>Syria</option>
							<option value='Taiwan'>Taiwan</option>
							<option value='Tajikistan'>Tajikistan</option>
							<option value='Tanzania'>Tanzania</option>
							<option value='Thailand'>Thailand</option>
							<option value='Togo'>Togo</option>
							<option value='Tonga'>Tonga</option>
							<option value='Trinidad and Tobago'>Trinidad and Tobago</option>
							<option value='Tunisia'>Tunisia</option>
							<option value='Turkey'>Turkey</option>
							<option value='Turkmenistan'>Turkmenistan</option>
							<option value='Tuvalu'>Tuvalu</option>
							<option value='Uganda'>Uganda</option>
							<option value='Ukraine'>Ukraine</option>
							<option value='United Arab Emirates'>United Arab Emirates</option>
							<option value='United Kingdom'>United Kingdom</option>
							<option value='United States'>United States</option>
							<option value='Uruguay'>Uruguay</option>
							<option value='Uzbekistan'>Uzbekistan</option>
							<option value='Vanuatu'>Vanuatu</option>
							<option value='Vatican City'>Vatican City</option>
							<option value='Venezuela'>Venezuela</option>
							<option value='Vietnam'>Vietnam</option>
							<option value='Yemen'>Yemen</option>
							<option value='Zambia'>Zambia</option>
							<option value='Zimbabwe'>Zimbabwe</option>
						</select>
					</label>
					<input
						type='text'
						placeholder='language'
						value={language}
						onChange={(e) => setlanguage(e.target.value)}
						className='w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
					<button
						type='submit'
						ref={BTNRef}
						disabled={
							isLoading ||
							fullname === "" ||
							email === "" ||
							password === "" ||
							country === "" ||
							language === ""
						}
						className='w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-3 rounded disabled:bg-gray-300 disabled:cursor-not-allowed'
					>
						{isLoading ? "Loading..." : "Register"}
					</button>
				</form>
				<div className='mt-4 text-center'>
					<p className='text-gray-600'>
						Already have an account?{" "}
						<Link to='/login' className='text-blue-500'>
							Sign In
						</Link>
					</p>
				</div>
				{message && <p className='mt-4 text-center text-red-500'>{message}</p>}
				<ToastContainer />
			</div>
		</div>
	);
};

export default SignUp;
