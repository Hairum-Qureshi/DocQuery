import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";

export default function InboxSideBar() {
	const [expand, setExpand] = useState(false);
	const navigate = useNavigate();

	return (
		<div
			className={`${
				!expand
					? "w-[5%] flex-col items-start justify-start"
					: "w-[25%] flex-row items-start justify-start"
			} transition-all duration-300 h-screen bg-blue-700 flex gap-4 p-4`}
		>
			<button
				className="w-10 h-10 bg-blue-500 flex items-center justify-center text-white rounded hover:cursor-pointer"
				onClick={() => navigate(-1)}
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
	);
}
