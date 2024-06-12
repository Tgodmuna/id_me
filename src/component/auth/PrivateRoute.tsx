// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }: { element: React.ElementType; [key: string]: any }) => {
	const token = sessionStorage.getItem("token");

	return token ? <Component {...rest} /> : <Navigate to='/login' />;
};

export default PrivateRoute;
