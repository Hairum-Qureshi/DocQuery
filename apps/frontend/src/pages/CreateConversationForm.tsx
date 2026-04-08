import { useState } from "react";
import UploadedPDF from "../components/UploadedPDF";

// TODO - maybe have it so that the user can select existing uploaded documents as well instead of having to upload them

export default function CreateConversationForm() {
	const [enabled, setEnabled] = useState(false);

	return (
		<div className="min-h-screen bg-gray-50 flex justify-center px-6 py-10">
			<div className="w-full max-w-5xl rounded-xl p-3">
				<div className="flex items-center">
					<h2 className="text-3xl font-semibold text-blue-700">
						Create a Conversation
					</h2>
					<p className="ml-auto mr-4">Choose existing documents</p>
					<button
						onClick={() => setEnabled(!enabled)}
						className={`relative inline-flex hover:cursor-pointer h-6 w-11 items-center rounded-full transition-colors ${
							enabled ? "bg-blue-600" : "bg-gray-300"
						}`}
					>
						<span
							className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
								enabled ? "translate-x-6" : "translate-x-1"
							}`}
						/>
					</button>
				</div>
				<p className="text-gray-500 mt-2">
					Set up a new conversation and invite participants.
				</p>

				<form className="mt-8 flex flex-col gap-10">
					{/* TOP SECTION (responsive split) */}
					<div className="flex flex-col md:flex-row gap-10">
						{/* LEFT SIDE */}
						<div className="flex-1 space-y-6">
							{/* Conversation Name */}
							<div className="flex flex-col space-y-2">
								<label className="text-sm font-medium text-gray-700">
									Conversation Name
									<span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									placeholder="e.g. Project Alpha Discussion"
									className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
								/>
							</div>

							{/* Participants */}
							<div className="flex flex-col space-y-2">
								<label className="text-sm font-medium text-gray-700">
									Participants (read-only)
								</label>
								<textarea
									placeholder="Enter emails separated by commas"
									className="border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
								/>
								<p className="text-xs text-gray-500">
									Must be registered users. They can view, but not send
									messages.
								</p>
							</div>
						</div>

						{/* RIGHT SIDE */}
						<div className="flex-1 space-y-4">
							{!enabled ? (
								<>
									<label className="text-sm font-medium text-gray-700">
										Upload Documents
										<span className="text-red-500">*</span>
									</label>
									<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-blue-400 transition cursor-pointer">
										<p className="text-gray-500">Drag & drop files here</p>
										<p className="text-sm text-gray-400 mt-1">
											or click to browse
										</p>
									</div>
									<p className="text-xs text-gray-500">
										These documents will be used as context in the conversation.
									</p>
									<div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-3">
										<div className="flex items-center justify-between mb-2">
											<p className="text-sm font-medium text-gray-700">
												Uploaded Files (5)
											</p>
											<button
												type="button"
												className="text-xs text-red-500 hover:underline"
											>
												Clear all
											</button>
										</div>

										<div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
											<UploadedPDF reducePadding showRemove />
											<UploadedPDF reducePadding showRemove />
											<UploadedPDF reducePadding showRemove />
											<UploadedPDF reducePadding showRemove />
											<UploadedPDF reducePadding showRemove />
										</div>
									</div>
								</>
							) : (
								<div className="flex flex-col space-y-2">
									<label className="text-sm font-medium text-gray-700">
										List of uploaded document URLs (comma separated)
										<span className="text-red-500">*</span>
									</label>
									<textarea
										placeholder="e.g. https://example.com/doc1.pdf, https://example.com/doc2.pdf"
										className="border border-gray-300 rounded-lg px-4 py-2 h-56 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
									/>
									<p className="text-xs text-gray-500 mt-1">
										These documents will be used as context in the conversation
										and must be documents you or your team have uploaded. You can find the URLs of your
										uploaded documents in your profile under "My Documents".
									</p>
								</div>
							)}
						</div>
					</div>

					{/* SUBMIT BUTTON (always at bottom on mobile) */}
					<div className="flex justify-end">
						<button
							type="submit"
							className="w-full md:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 active:scale-[0.98] transition"
						>
							Create Conversation
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
