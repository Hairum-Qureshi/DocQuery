import { Link, useLocation, useParams } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";

export default function ConversationHeader() {
	const { convoID } = useParams();
	const location = useLocation();
	const locationIncludesDocuments = location.pathname.includes("/documents");

	return (
		<div className="w-full bg-white shadow-md p-4 border-b border-gray-200 flex items-center">
			<h3 className="text-xl font-semibold text-blue-600">
				Conversation Title Here
			</h3>
			{!locationIncludesDocuments ? (
				<Link to={`/conversations/c/${convoID}/documents`} className="ml-auto">
					<p className="text-2xl hover:cursor-pointer flex items-center  ml-auto text-black gap-1">
						<IoIosInformationCircleOutline />
					</p>
				</Link>
			) : (
				<Link to={`/conversations/c/${convoID}`} className="ml-auto">
					<p className="text-lg flex items-center hover:cursor-pointer ml-auto text-black gap-1">
						<span>
							<FaArrowLeft />
						</span>{" "}
						Back
					</p>
				</Link>
			)}
		</div>
	);
}
