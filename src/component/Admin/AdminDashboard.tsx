import React from "react";
import Sidebar from "./AdminSideBar";
import Main from "./Main";
import { Outlet, useLocation } from "react-router-dom";

const AdminDashboard = () => {
	const path = useLocation().pathname;

	const OutletRoutes = ["/admin/users", "/admin/notifyUser", "/admin/send-emails", "/admin/userData"];

	const isOutlet = OutletRoutes.includes(path);
	return (
		<div className={`flex h-full w-full `}>
			<Sidebar />
			<div className={`m-auto p-4 bg-gray-100 h-[100vh] w-full`}>{isOutlet ? <Outlet /> : <Main />}</div>
		</div>
	);
};

export default AdminDashboard;
