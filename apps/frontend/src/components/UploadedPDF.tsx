import { FaDownload } from "react-icons/fa6";
import { AiFillFilePdf } from "react-icons/ai";

export default function UploadedPDF() {
	return (
		<div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-200 hover:shadow-md transition-shadow cursor-pointer">
			<div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-md">
				<AiFillFilePdf className="text-2xl text-blue-600" />
			</div>
			<p className="text-gray-800 font-medium truncate">Some File.pdf</p>
			<p className="ml-auto text-gray-500">
				<FaDownload />
			</p>
		</div>
	);
}
