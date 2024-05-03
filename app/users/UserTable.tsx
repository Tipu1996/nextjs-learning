import React from "react";
import { sort } from "fast-sort";
import Link from "next/link";

interface User {
	id: number;
	name: string;
	email: string;
}

interface Props {
	sortBy: string;
	sortOrder: string;
}

const UserTable = async ({ sortBy, sortOrder }: Props) => {
	const res = await fetch("https://jsonplaceholder.typicode.com/users");
	const users: User[] = await res.json();

	const sortedUsers =
		sortOrder === "desc"
			? sort(users).desc(
					sortBy === "email"
						? (user) => user.email
						: (user) => user.name,
			  )
			: sort(users).asc(
					sortBy === "email"
						? (user) => user.email
						: (user) => user.name,
			  );

	return (
		<>
			<table className="table">
				<thead>
					<tr>
						<th>
							{sortOrder === "desc" ? (
								<Link href="./users?sortBy=name&sortOrder=asc">
									Name
								</Link>
							) : (
								<Link href="./users?sortBy=name&sortOrder=desc">
									Name
								</Link>
							)}
						</th>
						<th>
							{sortOrder === "desc" ? (
								<Link href="./users?sortBy=email&sortOrder=asc">
									Email
								</Link>
							) : (
								<Link href="./users?sortBy=email&sortOrder=desc">
									Email
								</Link>
							)}
						</th>
					</tr>
				</thead>
				<tbody>
					{sortedUsers.map((user) => (
						<tr key={user.id}>
							<td>{user.name}</td>
							<td>{user.email}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default UserTable;
