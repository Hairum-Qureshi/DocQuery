import { AiFillFilePdf } from "react-icons/ai";

export default function UploadsTable() {
	return (
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
	);
}
