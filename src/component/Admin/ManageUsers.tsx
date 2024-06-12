import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
	citizenship: string;
	firstName: string;
	lastName: string;
	dob: Date;
	address: string;
	phoneNumber: string;
	ssn: string;
	document: string;
	video: string;
	image: string;
	iban: string;
	UserFullName: string;
	userID: string;
	verified: boolean;
}

const UserManagement: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true);
			try {
				const response = await axios.get("http://localhost:7000/users");
				console.log(response.data);
				setUsers(response.data);
			} catch (err) {
				setError("Error fetching users. Please try again later.");
				console.log(err);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	const handleVerifyToggle = async (userId: string) => {
		try {
			const updatedUsers = users.map((user) =>
				user.userID === userId ? { ...user, verified: !user.verified } : user
			);
			setUsers(updatedUsers);
			await axios.patch(`http://localhost:7000/verified/${userId}`, {
				verified: updatedUsers.find((user) => user.userID === userId)?.verified,
			});
		} catch (err) {
			setError("Error updating user verification status. Please try again later.");
		}
	};

	return (
		<div className='bg-gray-50 w-full max-w-full p-6'>
			<div className='text-2xl font-semibold text-gray-800 mb-6'>User Management-{users.length} </div>
			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<div>Error: {error}</div>
			) : (
				<table className='min-w-full bg-white rounded-lg shadow-md'>
					<thead>
						<tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
							<th className='py-3 px-6 text-left'>Full Name</th>
							<th className='py-3 px-6 text-left'>Citizenship</th>
							<th className='py-3 px-6 text-left'>Phone Number</th>
							<th className='py-3 px-6 text-left'>Verified</th>
						</tr>
					</thead>
					<tbody className='text-gray-600 text-sm font-light'>
						{users.map((user) => (
							<tr key={user.userID} className='border-b border-gray-200 hover:bg-gray-100'>
								<td className='py-3 px-6 text-left'>{`${user.firstName} ${user.lastName}`}</td>
								<td className='py-3 px-6 text-left'>{user.citizenship}</td>
								<td className='py-3 px-6 text-left'>{user.phoneNumber}</td>
								<td className='py-3 px-6 text-left'>
									<input
										type='checkbox'
										checked={user.verified}
										onChange={() => handleVerifyToggle(user.userID)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default UserManagement;
