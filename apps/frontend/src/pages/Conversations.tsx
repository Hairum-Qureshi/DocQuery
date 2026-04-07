import InboxSideBar from "../components/InboxSideBar";
import ChatGreetingMessage from "../components/ChatGreetingMessage";
import { useParams } from "react-router-dom";

export default function Conversations() {
	const { convoID } = useParams();

	return (
		<div className="w-full h-screen flex">
			<InboxSideBar />
			<div className="w-[95%] min-h-screen bg-gray-100 overflow-y-auto">
				<div className="flex items-center justify-center h-screen flex-col">
					{convoID ? <></> : <ChatGreetingMessage />}
				</div>
			</div>
		</div>
	);
}
