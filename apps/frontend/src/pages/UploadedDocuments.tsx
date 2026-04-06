import AccessTable from "../components/AccessTable";
import UploadsTable from "../components/UploadsTable";

export default function UploadedDocuments() {
	return (
		<div className="py-15 px-25">
			<h2 className="font-semibold text-3xl text-blue-700">
				Uploaded Documents
			</h2>
			<div className="border-b w-full border-gray-200 pb-4">
				<p className="mt-3 text-base text-gray-500">
					Please note that all documents here corresponded to your existing
					chats. Deleting any documents will affect your AI's knowledge base if
					that particular document was previously referenced or used in any of
					your existing chats.
				</p>
			</div>
			<div className="w-full flex items-center gap-3">
				<button className="my-5 hover:cursor-pointer py-2 px-4 bg-blue-800 text-white rounded-md">
					Upload Documents
				</button>
				<button className="my-5 hover:cursor-pointer py-2 px-4 bg-green-700 text-white rounded-md">
					Give Access
				</button>
			</div>
			<div className="w-full my-4">
				<h3 className="font-semibold text-2xl text-blue-700 my-6">
					Who currently has access to your documents?
				</h3>
				<AccessTable />
			</div>
			<div className="w-full my-4">
				<h3 className="font-semibold text-2xl text-blue-700 my-6">Files</h3>
				<UploadsTable />
			</div>
		</div>
	);
}
