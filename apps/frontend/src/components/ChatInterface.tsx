import ChatGreetingMessage from "./ChatGreetingMessage";

export default function ChatInterface() {
	return (
		<div className="relative border border-black w-full h-screen overflow-y-scroll">
			<div className="flex items-center justify-center h-screen flex-col">
				<ChatGreetingMessage />
			</div>
			<div className="absolute bottom-0 mb-20 rounded-md w-7/12 border-2 border-gray-300 left-1/2 transform -translate-x-1/2">
				<textarea
					placeholder="Type your message here..."
					className="p-2 flex items-center bg-gray-100 min-h-20 max-h-20 w-full resize-none rounded-md outline-none"
				></textarea>
			</div>
		</div>
	);
}
