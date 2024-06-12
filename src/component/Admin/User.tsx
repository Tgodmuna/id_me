import React from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlineCheckCircle } from "react-icons/ai";
import useFetchUsers from "../../hooks/useFetch";

const UserTable = () => {
	const { users, loading, error } = useFetchUsers();

	console.log(users);

	if (loading) return <div className={`loading`}>Loading...</div>;
	if (error) return <div className={`error`}>Error: {error.message}</div>;

	const renderMedia = (media: any) => {
		if (!media || !media.data) return null;
		const blob = new Blob([new Uint8Array(media.data.data)], { type: media.contentType });
		const url = URL.createObjectURL(blob);
		return <img src={url} alt='media' className='w-10 h-10 rounded' />;
	};

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
							<th className='py-3 px-6 text-left'>Address</th>
							<th className='py-3 px-6 text-left'>Citizenship</th>
							<th className='py-3 px-6 text-left'>Date of Birth</th>
							<th className='py-3 px-6 text-left'>Phone Number</th>
							<th className='py-3 px-6 text-left'>Image</th>
							<th className='py-3 px-6 text-left'>Document</th>
							<th className='py-3 px-6 text-left'>Video</th>
						</tr>
					</thead>
					<tbody className='text-gray-600 text-sm font-light'>
						{users.map((user, index) => (
							<tr key={index} className='border-b border-gray-200 hover:bg-gray-100'>
								<td className='py-3 px-6 text-left flex items-center'>
									<AiOutlineUser className='text-blue-500 mr-2' />
									<span>{user.UserFullName}</span>
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
								<td className='py-3 px-6 text-left'>{user.address}</td>
								<td className='py-3 px-6 text-left'>{user.citizenship}</td>
								<td className='py-3 px-6 text-left'>{user.dob}</td>
								<td className='py-3 px-6 text-left'>{user.phoneNumber}</td>
								<td className='py-3 px-6 text-left'>
									{renderMedia(user && user.image)}
								</td>
								<td className='py-3 px-6 text-left'>
									{renderMedia(user && user.document)}
								</td>
								<td className='py-3 px-6 text-left'>
									{renderMedia(user && user.video)}
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
