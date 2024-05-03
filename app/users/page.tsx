import React, { Suspense } from "react";
import UserTable from "./UserTable";
import Link from "next/link";

interface Props {
	searchParams: { sortBy: string; sortOrder: string };
}

const UsersPage = async ({ searchParams: { sortBy, sortOrder } }: Props) => {
	return (
		<>
			<h1>Users</h1>
			<div>
				<Link href="./users/new" className="btn">
					New User
				</Link>
			</div>
			<Suspense
				fallback={
					<div>
						<span className="loading loading-spinner loading-lg"></span>
					</div>
				}>
				<UserTable sortBy={sortBy} sortOrder={sortOrder} />
			</Suspense>
		</>
	);
};

export default UsersPage;
