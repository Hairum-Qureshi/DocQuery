import { AiFillFilePdf } from "react-icons/ai";

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
			<div>
				<button className="my-5 py-2 px-4 bg-blue-800 text-white rounded-md">
					Upload Documents
				</button>
			</div>
			<div>
				<div className="overflow-hidden rounded-md border border-gray-300">
					<table className="min-w-full table-fixed">
						<thead>
							<tr className="bg-gray-100">
								<th className="p-3 text-left w-1/3">Name</th>
								<th className="p-3 text-left w-1/3">Uploaded Date</th>
								<th className="p-3 text-left w-1/3">Uploaded By</th>
								<th className="p-3 text-left w-1/3">Actions</th>
							</tr>
						</thead>

						<tbody>
							<tr className="hover:bg-gray-50 cursor-pointer">
								<td className="p-4">
									<div className="flex items-center gap-2">
										<AiFillFilePdf className="text-3xl text-slate-500 bg-gray-200 p-1 rounded-md flex items-center justify-center" />
										<p>Some File.pdf</p>
									</div>
								</td>
								<td className="p-4">March 14th, 2024 at 3:00 PM</td>
								<td className="p-4">
									<div className="flex items-center gap-2">
										<img
											src="https://i.pinimg.com/474x/9c/0f/06/9c0f06b14aba220811331c49718d6b93.jpg"
											className="w-8 h-8 rounded-full"
											alt="User Avatar"
										/>
										<p>Mark Joe</p>
									</div>
								</td>
								<td className="p-4 text-red-600 hover:underline cursor-pointer font-semibold">
									Delete
								</td>
							</tr>
							<tr className="border-t border-gray-300 hover:bg-gray-50 cursor-pointer">
								<td className="p-4">
									<div className="flex items-center gap-2">
										<AiFillFilePdf className="text-3xl text-slate-500 bg-gray-200 p-1 rounded-md flex items-center justify-center" />
										<p>Some File.pdf</p>
									</div>
								</td>
								<td className="p-4">March 14th, 2024 at 3:00 PM</td>
								<td className="p-4">
									<div className="flex items-center gap-2">
										<img
											src="https://i.pinimg.com/474x/9c/0f/06/9c0f06b14aba220811331c49718d6b93.jpg"
											className="w-8 h-8 rounded-full"
											alt="User Avatar"
										/>
										<p>Alex Joe</p>
									</div>
								</td>
								<td className="p-4 text-red-600 hover:underline cursor-pointer font-semibold">
									Delete
								</td>
							</tr>
							<tr className="border-t border-gray-300 hover:bg-gray-50 cursor-pointer">
								<td className="p-4">
									<div className="flex items-center gap-2">
										<AiFillFilePdf className="text-3xl text-slate-500 bg-gray-200 p-1 rounded-md flex items-center justify-center" />
										<p>Some File.pdf</p>
									</div>
								</td>
								<td className="p-4">March 14th, 2024 at 3:00 PM</td>
								<td className="p-4">
									<div className="flex items-center gap-2">
										<img
											src="https://i.pinimg.com/474x/9c/0f/06/9c0f06b14aba220811331c49718d6b93.jpg"
											className="w-8 h-8 rounded-full"
											alt="User Avatar"
										/>
										<p>Enid Joe</p>
									</div>
								</td>
								<td className="p-4 text-red-600 hover:underline cursor-pointer font-semibold">
									Delete
								</td>
							</tr>
							<tr className="border-t border-gray-300 hover:bg-gray-50 cursor-pointer">
								<td className="p-4">
									<div className="flex items-center gap-2">
										<AiFillFilePdf className="text-3xl text-slate-500 bg-gray-200 p-1 rounded-md flex items-center justify-center" />
										<p>Some File.pdf</p>
									</div>
								</td>
								<td className="p-4">March 14th, 2024 at 3:00 PM</td>
								<td className="p-4">
									<div className="flex items-center gap-2">
										<img
											src="https://i.pinimg.com/474x/9c/0f/06/9c0f06b14aba220811331c49718d6b93.jpg"
											className="w-8 h-8 rounded-full"
											alt="User Avatar"
										/>
										<p>Sam Doe</p>
									</div>
								</td>
								<td className="p-4 text-red-600 hover:underline cursor-pointer font-semibold">
									Delete
								</td>
							</tr>
							<tr className="border-t border-gray-300 hover:bg-gray-50 cursor-pointer">
								<td className="p-4">
									<div className="flex items-center gap-2">
										<AiFillFilePdf className="text-3xl text-slate-500 bg-gray-200 p-1 rounded-md flex items-center justify-center" />
										<p>Some File.pdf</p>
									</div>
								</td>
								<td className="p-4">March 14th, 2024 at 3:00 PM</td>
								<td className="p-4">
									<div className="flex items-center gap-2">
										<img
											src="https://i.pinimg.com/474x/9c/0f/06/9c0f06b14aba220811331c49718d6b93.jpg"
											className="w-8 h-8 rounded-full"
											alt="User Avatar"
										/>
										<p>Jane Doe</p>
									</div>
								</td>
								<td className="p-4 text-red-600 hover:underline cursor-pointer font-semibold">
									Delete
								</td>
							</tr>
							<tr className="border-t border-gray-300 hover:bg-gray-50 cursor-pointer">
								<td className="p-4">
									<div className="flex items-center gap-2">
										<AiFillFilePdf className="text-3xl text-slate-500 bg-gray-200 p-1 rounded-md flex items-center justify-center" />
										<p>Some File.pdf</p>
									</div>
								</td>
								<td className="p-4">March 14th, 2024 at 3:00 PM</td>
								<td className="p-4">
									<div className="flex items-center gap-2">
										<img
											src="https://i.pinimg.com/474x/9c/0f/06/9c0f06b14aba220811331c49718d6b93.jpg"
											className="w-8 h-8 rounded-full"
											alt="User Avatar"
										/>
										<p>John Doe</p>
									</div>
								</td>
								<td className="p-4 text-red-600 hover:underline cursor-pointer font-semibold">
									Delete
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
