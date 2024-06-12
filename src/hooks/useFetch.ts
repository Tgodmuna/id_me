// useFetchUsers.ts
import { useState, useEffect } from "react";
import axios from "axios";

// types.ts
export interface User {
	id: number;
	name: string;
	email: string;
	verified: boolean;
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
				const response = await axios.get("https://id-me-server.onrender.com/users");
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
