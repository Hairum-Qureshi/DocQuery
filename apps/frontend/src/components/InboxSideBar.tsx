import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import Conversation from "./Conversation";
import useConversation from "../hooks/useConversation";
import type { Conversation as ConversationInterface } from "../interfaces";

export default function InboxSideBar() {
	const [expand, setExpand] = useState(false);
	const navigate = useNavigate();
	const { conversationsList } = useConversation();

	return (
		<div
			className={`h-screen bg-blue-700 flex flex-col p-4
    transition-all duration-500 ease-in-out
    ${expand ? "w-[25%]" : "w-[5%]"}`}
		>
			{/* Buttons */}
			<div
				className={`flex gap-2 mb-4 ${
					expand ? "flex-row" : "flex-col items-center"
				}`}
			>
				<button
					className="w-10 h-10 bg-blue-500 flex items-center justify-center text-white rounded hover:cursor-pointer"
					onClick={() => navigate("/")}
					title="Go Back"
				>
					<FaArrowLeft />
				</button>
				<button
					className="w-10 h-10 bg-blue-500 flex items-center justify-center text-white rounded hover:cursor-pointer"
					onClick={() => setExpand(!expand)}
					title="Toggle Sidebar"
				>
					<TbLayoutSidebarRightCollapseFilled />
				</button>
			</div>

			{expand && (
				<div className="h-screen overflow-y-scroll">
					<input
						type="text"
						placeholder="Search..."
						className="w-full placeholder:text-gray-200 border-2 text-white border-blue-400 px-3 py-2 rounded outline-none mb-4 bg-blue-500"
					/>
					<div className="space-y-4 flex flex-col">
						{conversationsList?.length &&
							conversationsList?.map((conversation: ConversationInterface) => (
								<Link
									to={`/conversations/c/${conversation._id}`}
									key={conversation._id}
								>
									<Conversation title={conversation.title} />
								</Link>
							))}
					</div>
				</div>
			)}
		</div>
	);
}
