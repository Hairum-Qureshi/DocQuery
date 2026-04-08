import { FaDownload } from "react-icons/fa6";
import { AiFillFilePdf } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

export default function UploadedPDF({
	fileName,
	indexToRemove,
	reducePadding = false,
	showRemove = false,
	removeFile
}: {
	fileName: string;
	indexToRemove: number;
	reducePadding?: boolean;
	showRemove?: boolean;
	removeFile: (indexToRemove: number) => void;
}) {
	return (
		<div
			className={`flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-200 hover:shadow-md transition-shadow cursor-pointer ${reducePadding ? "py-2" : ""}`}
		>
			<div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-md shrink-0">
				<AiFillFilePdf className="text-2xl text-blue-600" />
			</div>
			<p className="text-gray-800 font-medium truncate">{fileName}</p>
			<p
				className={`${showRemove ? "ml-auto text-gray-500 flex items-center" : "ml-auto text-gray-500 flex"}`}
			>
				<FaDownload />
				{showRemove && (
					<IoMdClose
						className="ml-2 text-2xl text-red-500 hover:text-red-700"
						onClick={() => removeFile(indexToRemove)}
					/>
				)}
			</p>
		</div>
	);
}
