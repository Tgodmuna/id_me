import React, { useEffect, useState } from "react";
import GenericNotification from "./Notification";
import Dashboard from "../dashboard/Dashboard";
import LogIn from "./Sign-in";
import { useNavigate } from "react-router-dom";

const Authenticator: React.FC = () => {
	// State to manage whether to show the warning
	const [showWarning, setShowWarning] = React.useState(false);
	const [isAuthenticated, setisAuthenticated] = useState(false);
	const [Token, setToken] = useState<string>("");
	const navigate = useNavigate();
	// const [showMessage, setShowMessage] = React.useState(false);

	const tokenExtractor = (token: string) => {
		setToken(token);
	};

	useEffect(() => {
		Token && setisAuthenticated(true);
	}, [Token]);

	// Effect to check if user is not authenticated and show the warning
	React.useEffect(() => {
		if (!Token && !isAuthenticated) {
			setShowWarning(true);
		} else {
			setShowWarning(false);
		}
	}, [Token, isAuthenticated]);

	if (Token && isAuthenticated) {
		navigate("/dashboard");
	}

	// If user is not authenticated, show warning and login form
	if (!Token && !isAuthenticated) {
		return (
			<>
				<GenericNotification
					message={"Not authenticated to view that page. Register or login to have access."}
					onClose={() => setShowWarning(false)}
					show={showWarning}
					colorName={"bg-red-500"}
				/>
				<LogIn extractor={tokenExtractor} />
			</>
		);
	} else {
		// If user is authenticated, show the dashboard
		return (
			<>
				<Dashboard />
			</>
		);
	}
};

export default Authenticator;
