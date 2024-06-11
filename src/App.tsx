/* eslint-disable react/jsx-pascal-case */
import { Route, Routes } from "react-router-dom";
import INDEX from "./component/INDEX";
import LogIn from "./component/auth/Sign-in";
import SignUp from "./component/auth/Register";
import UserProfile from "./component/dashboard/Profile";
import Data_Inputs from "./component/dashboard/Data_inputs";
import Notification from "./component/dashboard/Notification";
import OtpVerification from "./component/auth/OTPverification";
import Authenticator from "./component/auth/Authenticator";

function App() {
	let parsedUserDetails;
	const userDetails = sessionStorage.getItem("userDetails");

	if (userDetails) {
		parsedUserDetails = JSON.parse(userDetails);
	}

	return (
		<div className='App '>
			<Routes>
				<Route path='/' element={<INDEX />} />
				<Route path='/login' element={<LogIn />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/otp-verification' element={<OtpVerification />} />
				{/* dashboard */}
				<Route path='/dashboard' element={<Authenticator />}>
					<Route
						path='/dashboard/profile'
						element={
							<UserProfile
								user={{
									name: parsedUserDetails
										? parsedUserDetails.fullname
										: "not available",
									email: parsedUserDetails
										? parsedUserDetails.email
										: "not available",
								}}
							/>
						}
					/>
					<Route path='/dashboard/Verification' element={<Data_Inputs />} />
					<Route path='/dashboard/notification' element={<Notification />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
