export default function CreateConversationForm() {
	return (
		<div className="min-h-screen bg-gray-50 flex justify-center px-6">
			<div className="w-full max-w-5xl rounded-xl mt-10 p-8">
				<h2 className="text-3xl font-semibold text-blue-700">
					Create a Conversation
				</h2>
				<p className="text-gray-500 mt-2">
					Set up a new conversation and invite participants.
				</p>
				<form className="mt-8 flex flex-col md:flex-row gap-10">
					{/* LEFT SIDE */}
					<div className="flex-1 space-y-6">
						<div className="flex flex-col space-y-2">
							<label className="text-sm font-medium text-gray-700">
								Conversation Name<span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								placeholder="e.g. Project Alpha Discussion"
								className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
							/>
						</div>
						<div className="flex flex-col space-y-2">
							<label className="text-sm font-medium text-gray-700">
								Participants (read-only)
							</label>
							<textarea
								placeholder="Enter emails separated by commas"
								className="border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
							/>
							<p className="text-xs text-gray-500">
								Must be registered users. They can view but not send messages.
							</p>
						</div>
						<button
							type="submit"
							className="w-full md:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 active:scale-[0.98] transition"
						>
							Create Conversation
						</button>
					</div>
					{/* RIGHT SIDE */}
					<div className="flex-1 space-y-4">
						<label className="text-sm font-medium text-gray-700">
							Upload Documents<span className="text-red-500">*</span>
						</label>
						<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-blue-400 transition cursor-pointer">
							<p className="text-gray-500">Drag & drop files here</p>
							<p className="text-sm text-gray-400 mt-1">or click to browse</p>
						</div>
						<p className="text-xs text-gray-500">
							These documents will be used as context in the conversation.
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
