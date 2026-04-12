import ChatGreetingMessage from "./ChatGreetingMessage";
import ResponseBubble from "./ResponseBubble";
import ConversationHeader from "./ConversationHeader";
import useMessaging from "../hooks/useMessaging";
import { useState } from "react";
import { useParams } from "react-router-dom";
import type { Message } from "../interfaces";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function ChatInterface() {
	const { sendMessageMutation, convoMessages } = useMessaging();
	const { convoID } = useParams();
	const [message, setMessage] = useState("");
	const { data: currUserData } = useCurrentUser();

	// TODO - add autoscroll to bottom
	// TODO - have the AI response render HTML instead of just text, so we can have better formatting and stuff like code blocks
	// TODO - replace 'conversation title here' header with actual convo title
	// TODO - for each AI response, add a section that includes a source
	// TODO - add text streaming

	return (
		<div className="relative flex flex-col h-screen bg-gray-50">
			<ConversationHeader />
			<div className="flex-1 w-full flex justify-center overflow-hidden">
				<div className="w-full max-w-5xl my-4 flex flex-col gap-4 p-4 overflow-y-auto">
					{!convoID || !convoMessages?.length ? (
						<div className="flex items-center justify-center h-screen flex-col">
							<ChatGreetingMessage />
						</div>
					) : (
						convoMessages?.map((message: Message, index: number) => {
							return (
								<div className="flex flex-col gap-4" key={index}>
									<ResponseBubble
										message={message.content}
										you={message.senderID === currUserData?._id}
									/>
								</div>
							);
						})
					)}
				</div>
			</div>
			<div className="w-full bg-white p-4 border-t border-gray-200">
				<div className="max-w-3xl mx-auto flex items-center gap-2">
					<textarea
						placeholder="Type your message..."
						className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none min-h-15 max-h-30 bg-gray-50"
						value={message}
						onChange={e => setMessage(e.target.value)}
						onKeyDown={e => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								if (message.trim() && convoID) {
									sendMessageMutation({
										query: message,
										conversation_id: convoID
									});
									setMessage("");
								}
							}
						}}
					></textarea>
					<button
						className="bg-blue-600 hover:cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
						onClick={() => {
							if (message.trim() && convoID) {
								sendMessageMutation({
									query: message,
									conversation_id: convoID
								});
								setMessage("");
							}
						}}
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}
