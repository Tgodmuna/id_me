// UserTable.tsx
import React from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlineCheckCircle } from "react-icons/ai";
import useFetchUsers from "../../hooks/useFetch";

const UserTable = () => {
	const { users, loading, error } = useFetchUsers();

	if (loading) return <div className={`loading`}>Loading...</div>;
	if (error) return <div className={`error`}>Error: {error.message}</div>;

	return (
		<div className='bg-gray-50 w-full p-6'>
			<div className='text-2xl font-semibold text-gray-800 mb-6'>All Users</div>
			<div className='overflow-x-auto'>
				<table className='min-w-full bg-white rounded-lg shadow-md'>
					<thead>
						<tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
							<th className='py-3 px-6 text-left'>Name</th>
							<th className='py-3 px-6 text-left'>Email</th>
							<th className='py-3 px-6 text-left'>Status</th>
						</tr>
					</thead>
					<tbody className='text-gray-600 text-sm font-light'>
						{users.map((user) => (
							<tr key={user.id} className='border-b border-gray-200 hover:bg-gray-100'>
								<td className='py-3 px-6 text-left flex items-center'>
									<AiOutlineUser className='text-blue-500 mr-2' />
									<span>{user.name}</span>
								</td>
								<td className='py-3 px-6 text-left flex items-center'>
									<AiOutlineMail className='text-red-500 mr-2' />
									<span>{user.email}</span>
								</td>
								<td className='py-3 px-6 text-left flex items-center'>
									{user.verified ? (
										<AiOutlineCheckCircle className='text-green-500 mr-2' />
									) : (
										<AiOutlineCheckCircle className='text-gray-500 mr-2' />
									)}
									<span>{user.verified ? "Verified" : "Unverified"}</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserTable;
