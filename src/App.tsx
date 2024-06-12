/* eslint-disable react/jsx-pascal-case */
import { Route, Routes } from "react-router-dom";
import INDEX from "./component/INDEX";
import LogIn from "./component/auth/Sign-in";
import SignUp from "./component/auth/Register";
import UserProfile from "./component/dashboard/Profile";
import Data_Inputs from "./component/dashboard/Data_inputs";
import Notification from "./component/dashboard/Notification";
import OtpVerification from "./component/auth/OTPverification";
import AdminDashboard from "./component/Admin/AdminDashboard";
import UserTable from "./component/Admin/User";
import EmailForm from "./component/Admin/SendEmail";
import NotificationForm from "./component/Admin/Send-notification";
import UserManagement from "./component/Admin/ManageUsers";
import Dashboard from "./component/dashboard/Dashboard.js";

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
				<Route path='/dashboard' element={sessionStorage.getItem("token") ? <Dashboard /> : <LogIn />}>
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

				{/* admin routes */}
				<Route path={"/admin"} element={<AdminDashboard />}>
					<Route path='/admin/users' element={<UserTable />} />
					<Route path='/admin/notifyUser' element={<NotificationForm />} />
					<Route path='/admin/send-emails' element={<EmailForm />} />
					<Route path='/admin/userData' element={<UserManagement />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
