import InboxSideBar from "../components/InboxSideBar";
import ChatGreetingMessage from "../components/ChatGreetingMessage";
import { useLocation, useParams } from "react-router-dom";
import ChatInterface from "../components/ChatInterface";
import ConversationDocuments from "../components/ConversationDocuments";

export default function Conversations() {
	const { convoID } = useParams();
	const location = useLocation();

	const locationIncludesDocuments = location.pathname.includes("/documents");

	return (
		<div className="w-full h-screen flex">
			<InboxSideBar />
			<div className="w-[95%] min-h-screen bg-gray-100 overflow-y-auto">
				<div
					className={
						convoID ? "" : "flex items-center justify-center h-screen flex-col"
					}
				>
					{convoID ? (
						!locationIncludesDocuments ? (
							<ChatInterface />
						) : (
							<ConversationDocuments />
						)
					) : (
						<ChatGreetingMessage />
					)}
				</div>
			</div>
		</div>
	);
}
