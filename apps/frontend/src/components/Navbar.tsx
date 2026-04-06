import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<div className="flex text-white items-center px-4 py-3 bg-blue-700">
			<h1 className="text-2xl font-bold">DocQuery</h1>
			<nav className="ml-10 space-x-4">
				<Link to="/" className="hover:underline">
					Home
				</Link>
				<Link to="/about" className="hover:underline">
					About
				</Link>
				<Link to="/uploaded-documents" className="hover:underline">
					Uploaded Documents
				</Link>
				<Link to="/conversations" className="hover:underline">
					Conversations
				</Link>
				<Link to="/new" className="hover:underline">
					New Conversation
				</Link>
				<Link to="/settings" className="hover:underline">
					Settings
				</Link>
				<Link to="/account" className="hover:underline">
					Profile
				</Link>
				<Link to="/logout" className="hover:underline">
					Logout
				</Link>
			</nav>
		</div>
	);
}
