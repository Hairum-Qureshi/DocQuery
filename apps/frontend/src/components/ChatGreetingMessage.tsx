import { Link } from "react-router-dom";

export default function ChatGreetingMessage() {
	return (
		<div className="text-left space-y-4 w-3xl">
			<h2 className="font-bold text-blue-700 text-5xl">Hello John Doe,</h2>
			<h3 className="text-3xl">
				I'm your helpful assistant, <span className="text-sky-600">Docent</span>
			</h3>
			<h3>
				Feel free to click on any of your existing conversations and resume
				chatting with me. I'm here to help you learn your documents and answer
				any questions you have about them. If you don't have any conversations
				yet, feel free to start a new one by clicking{" "}
				<Link to="/new" className="text-blue-500 underline">
					here
				</Link>
				!
			</h3>
		</div>
	);
}
