// useFetchUsers.ts
import { useState, useEffect } from "react";
import axios from "axios";

// types.ts
export interface Media {
	data: { [key: string]: any };
	contentType: string;
}

export interface User {
	UserFullName: string;
	address: string;
	citizenship: string;
	dob: string;
	document: Media | null;
	email: string;
	firstName: string;
	iban: string | null;
	image: Media | null;
	lastName: string;
	phoneNumber: string;
	ssn: string | null;
	userID: string;
	verified: boolean;
	video: Media | null;
	__v: number;
	_id: string;
}

export interface ErrorState {
	message: string;
}

const useFetchUsers = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<ErrorState | null>(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get("http://localhost:7000/users");
				setUsers(response.data);
			} catch (err: any) {
				setError({ message: err.message });
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	return { users, loading, error };
};

export default useFetchUsers;
