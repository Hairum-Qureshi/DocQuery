import { FaDownload } from "react-icons/fa6";
import { AiFillFilePdf } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";
import axios from "axios";

export default function UploadedPDF({
	documentName,
	documentURL,
	indexToRemove,
	reducePadding = false,
	showRemove = false,
	removeFile
}: {
	documentName: string;
	documentURL?: string;
	indexToRemove?: number;
	reducePadding?: boolean;
	showRemove?: boolean;
	removeFile?: (indexToRemove: number) => void;
}) {
	async function downloadDocument(documentURL: string) {
		const response = await axios.get(documentURL, {
			responseType: "blob",
			headers: {
				Accept: "application/pdf"
			}
		});

		const blob = response.data;

		// Create blob link to download
		const url = window.URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "FileName.pdf");

		// Append to DOM
		document.body.appendChild(link);

		// Trigger download
		link.click();

		// Cleanup
		link.parentNode?.removeChild(link);
		window.URL.revokeObjectURL(url);
	}

	return (
		<div
			className={`flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-200 hover:shadow-md transition-shadow cursor-pointer ${reducePadding ? "py-2" : ""}`}
		>
			<div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-md shrink-0">
				<AiFillFilePdf className="text-2xl text-blue-600" />
			</div>
			<p className="text-gray-800 font-medium truncate">{documentName}</p>
			<div className="ml-auto flex items-center space-x-4 text-gray-500">
				{showRemove && (
					<button
						type="button"
						onClick={() =>
							removeFile && indexToRemove && removeFile(indexToRemove)
						}
						className="text-red-500 hover:text-red-700 hover:cursor-pointer"
						title="Remove document button"
					>
						<IoMdClose className="text-2xl" />
					</button>
				)}

				{!showRemove && (
					<>
						<button
							type="button"
							onClick={() => documentURL && downloadDocument(documentURL)}
							className="hover:text-gray-700 hover:cursor-pointer"
							title="Download button"
						>
							<FaDownload />
						</button>
						<button
							type="button"
							onClick={() =>
								window.open(documentURL, "_blank", "noopener,noreferrer")
							}
							className="hover:text-gray-700 hover:cursor-pointer"
							title="Open PDF in new tab button"
						>
							<FaExternalLinkAlt />
						</button>
					</>
				)}
			</div>
		</div>
	);
}
