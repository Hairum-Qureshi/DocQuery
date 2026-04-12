import ConversationHeader from "./ConversationHeader";
import { FaDownload } from "react-icons/fa6";
import UploadedPDF from "./UploadedPDF";
import useConversation from "../hooks/useConversation";

export default function ConversationDocuments() {
	const { conversationData } = useConversation();

	return (
		<div className="min-h-screen bg-gray-50">
			<ConversationHeader />
			<div className="flex justify-center w-full my-5 py-6 px-4">
				<div className="w-full max-w-3xl flex flex-col gap-3">
					<h2 className="text-2xl font-semibold text-blue-600 mb-4">
						Documents Provided In This Conversation
					</h2>
					<div className="flex flex-col gap-3">
						{conversationData?.documentReferences.length ? (
							conversationData?.documentReferences.map((doc, idx) => (
								<UploadedPDF
									key={idx}
									documentName={doc.fileName}
									documentURL={doc.url}
								/>
							))
						) : (
							<p className="text-gray-600 text-center">
								No documents uploaded in this conversation.
							</p>
						)}
						<div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-green-200 hover:shadow-md transition-shadow cursor-pointer">
							<div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-md">
								<FaDownload className="text-2xl text-green-600" />
							</div>
							<p className="text-gray-800 font-medium truncate">
								Download Conversation History
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
