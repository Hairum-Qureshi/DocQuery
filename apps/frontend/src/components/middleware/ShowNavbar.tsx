import { useLocation } from "react-router-dom";

export default function ShowNavbar({
	children
}: {
	children: React.ReactNode;
}) {
	const hideNavbarOnPaths = ["conversations"];
	const location = useLocation();

	return location.pathname
		.split("/")
		.some(path => hideNavbarOnPaths.includes(path))
		? null
		: children;
}
