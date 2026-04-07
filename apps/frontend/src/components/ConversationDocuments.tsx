import { AiFillFilePdf } from "react-icons/ai";
import ConversationHeader from "./ConversationHeader";

export default function ConversationDocuments() {
	return (
		<div className="min-h-screen bg-gray-50">
			<ConversationHeader />
			<div className="flex justify-center w-full my-5 py-6 px-4">
				<div className="w-full max-w-3xl flex flex-col gap-3">
					<h2 className="text-2xl font-semibold text-blue-600 mb-4">
						Documents Provided In This Conversation
					</h2>
					<div className="flex flex-col gap-3">
						{new Array(5).fill(0).map((_, idx) => (
							<div
								key={idx}
								className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-200 hover:shadow-md transition-shadow cursor-pointer"
							>
								<div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-md">
									<AiFillFilePdf className="text-2xl text-blue-600" />
								</div>
								<p className="text-gray-800 font-medium truncate">
									Some File.pdf
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
