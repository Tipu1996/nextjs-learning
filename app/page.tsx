import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
	return (
		<main>
			<h1>Hello Universe</h1>
			<Link href="/users">Users</Link> <br />
			{/* <Link href="/users/new">New User</Link> */}
			<ProductCard />
		</main>
	);
}
