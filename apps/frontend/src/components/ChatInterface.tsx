import ChatGreetingMessage from "./ChatGreetingMessage";
import ResponseBubble from "./ResponseBubble";

export default function ChatInterface() {
	return (
		<div className="relative flex flex-col h-screen bg-gray-50">
			{/* Header */}
			<div className="w-full bg-white shadow-md p-4 border-b border-gray-200">
				<h3 className="text-xl font-semibold text-blue-600">
					Conversation Title Here
				</h3>
			</div>
			<div className="flex-1 w-full flex justify-center overflow-hidden">
				<div className="w-full max-w-3xl flex flex-col gap-4 p-4 overflow-y-auto">
					{/* Optional Greeting */}
					{/* <div className="flex items-center justify-center h-screen flex-col">
						<ChatGreetingMessage />
					</div> */}

					{/* Messages */}
					<div className="flex flex-col gap-4">
						{new Array(20).fill(0).map((_, idx) => (
							<ResponseBubble key={idx} />
						))}
					</div>
				</div>
			</div>
			<div className="w-full bg-white p-4 border-t border-gray-200">
				<div className="max-w-3xl mx-auto flex items-center gap-2">
					<textarea
						placeholder="Type your message..."
						className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none min-h-15 max-h-30 bg-gray-50"
					></textarea>
					<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
						Send
					</button>
				</div>
			</div>
		</div>
	);
}
