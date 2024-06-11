import React from "react";
import { FaUser, FaEnvelope, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaLink } from "react-icons/fa";

const UserProfile: React.FC<{
	user: {
		name: string;
		email: string;
		profilePicture?: string | undefined;
		dob?: string | undefined;
		location?: string | undefined;
		phone?: string | undefined;
		bio?: string | undefined;
		website?: string | undefined;
		twitter?: string | undefined;
		linkedin?: string | undefined;
		occupation?: string | undefined;
		education?: string | undefined;
		citizenship?: string;
		firstName?: string;
		lastName?: string;
		address?: string;
		phoneNumber?: string;
		ssn?: string;
		iban?: string;
		verificationState?: "passed" | "failed" | "pending";
		termsAndConditions?: boolean;
	};
}> = ({ user }) => {
	return (
		<div className='bg-white rounded-lg shadow-md p-6'>
			<div className='flex items-center mb-4'>
				<div className='w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4'>
					{user.profilePicture ? (
						<img
							src={user.profilePicture}
							alt='Profile'
							className='w-full h-full rounded-full'
						/>
					) : (
						<FaUser className='text-gray-500' />
					)}
				</div>
				<div>
					<h2 className='text-xl font-semibold'>{user.name}</h2>
					<p className='text-gray-500'>{user.email}</p>
				</div>
			</div>
			<hr className='border-t border-gray-200 mb-4' />
			<div className='flex items-center mb-2'>
				<FaCalendarAlt className='text-gray-400 mr-2' />
				<p className='text-sm text-gray-500'>{user.dob || "Date of Birth not provided"}</p>
			</div>
			<div className='flex items-center mb-2'>
				<FaMapMarkerAlt className='text-gray-400 mr-2' />
				<p className='text-sm text-gray-500'>{user.location || "Location not provided"}</p>
			</div>
			<div className='flex items-center mb-2'>
				<FaPhone className='text-gray-400 mr-2' />
				<p className='text-sm text-gray-500'>{user.phoneNumber || "Phone number not provided"}</p>
			</div>
			<div className='flex items-center mb-2'>
				<FaEnvelope className='text-gray-400 mr-2' />
				<p className='text-sm text-gray-500'>{user.email}</p>
			</div>
			<div className='flex items-center mb-2'>
				<FaLink className='text-gray-400 mr-2' />
				<a
					href={user.website}
					target='_blank'
					rel='noopener noreferrer'
					className='text-sm text-gray-500'
				>
					{user.website || "Website not provided"}
				</a>
			</div>
			<div className='flex items-center mb-2'>
				<FaUser className='text-gray-400 mr-2' />
				<p className='text-sm text-gray-500'>{user.occupation || "Occupation not provided"}</p>
			</div>
			<div className='flex items-center mb-2'>
				<FaUser className='text-gray-400 mr-2' />
				<p className='text-sm text-gray-500'>{user.education || "Education not provided"}</p>
			</div>
			<div className='flex items-center mb-2'>
				<FaUser className='text-gray-400 mr-2' />
				<p className='text-sm text-gray-500'>{user.bio || "Bio not provided"}</p>
			</div>
			<div className='flex items-center mb-2'>
				<FaUser className='text-gray-400 mr-2' />
				<a
					href={user.twitter}
					target='_blank'
					rel='noopener noreferrer'
					className='text-sm text-gray-500'
				>
					{user.twitter || "Twitter not provided"}
				</a>
			</div>
			<div className='flex items-center mb-2'>
				<FaUser className='text-gray-400 mr-2' />
				<a
					href={user.linkedin}
					target='_blank'
					rel='noopener noreferrer'
					className='text-sm text-gray-500'
				>
					{user.linkedin || "LinkedIn not provided"}
				</a>
			</div>
			{(user.citizenship === "USA" || user.citizenship === "Germany") && (
				<div className='flex items-center mb-2'>
					<FaUser className='text-gray-400 mr-2' />
					<p className='text-sm text-gray-500'>
						{user.ssn
							? `SSN: ${user.ssn}`
							: user.iban
							? `IBAN: ${user.iban}`
							: "SSN or IBAN not provided"}
					</p>
				</div>
			)}
			<div className='flex items-center mb-2'>
				<FaUser className='text-gray-400 mr-2' />
				<p className='text-sm text-gray-500'>Verification State: {user.verificationState}</p>
			</div>
			<div className='flex items-center mb-2'>
				<FaUser className='text-gray-400 mr-2' />
				<p className='text-sm text-gray-500'>
					Terms and Conditions: {user.termsAndConditions ? "Accepted" : "Not Accepted"}
				</p>
			</div>
		</div>
	);
};

export default UserProfile;
