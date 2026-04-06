import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import "../css/index.css";
import UploadedDocuments from "../pages/UploadedDocuments";
import Navbar from "./Navbar";
import Conversations from "../pages/Conversations";
import CreateConversationForm from "../pages/CreateConversationForm";
import Settings from "../pages/Settings";
import Account from "../pages/Account";
import ShowNavbar from "./middleware/ShowNavbar";

export default function App() {
	return (
		<BrowserRouter>
			<ShowNavbar>
				<Navbar />
			</ShowNavbar>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/uploaded-documents" element={<UploadedDocuments />} />
				<Route path="/conversations" element={<Conversations />} />
				<Route path="/new" element={<CreateConversationForm />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/account" element={<Account />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
