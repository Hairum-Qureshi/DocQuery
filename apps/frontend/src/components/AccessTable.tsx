export default function AccessTable() {
	return (
		<div>
			<div className="overflow-hidden rounded-md border border-gray-300">
				<table className="min-w-full table-fixed">
					<thead>
						<tr className="bg-gray-100">
							<th className="p-3 text-left w-1/3">Name</th>
							<th className="p-3 text-left w-1/3">Permissions</th>
							<th className="p-3 text-left w-1/3">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr className="hover:bg-gray-50 cursor-pointer">
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
							<td className="p-4">READ, UPDATE</td>
							<td className="p-4 flex flex-col cursor-pointer font-semibold">
								<p className="text-red-600 hover:underline">Revoke Access</p>
								<p className="text-green-600 hover:underline">
									Edit Permissions
								</p>
							</td>
						</tr>
						<tr className="border-t border-gray-300 hover:bg-gray-50 cursor-pointer">
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
							<td className="p-4">READ, WRITE, DELETE, DOWNLOAD</td>
							<td className="p-4 flex flex-col cursor-pointer font-semibold">
								<p className="text-red-600 hover:underline">Revoke Access</p>
								<p className="text-green-600 hover:underline">
									Edit Permissions
								</p>
							</td>
						</tr>
						<tr className="border-t border-gray-300 hover:bg-gray-50 cursor-pointer">
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
							<td className="p-4">READ, WRITE</td>
							<td className="p-4 flex flex-col cursor-pointer font-semibold">
								<p className="text-red-600 hover:underline">Revoke Access</p>
								<p className="text-green-600 hover:underline">
									Edit Permissions
								</p>
							</td>
						</tr>
						<tr className="border-t border-gray-300 hover:bg-gray-50 cursor-pointer">
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
							<td className="p-4">READ</td>
							<td className="p-4 flex flex-col cursor-pointer font-semibold">
								<p className="text-red-600 hover:underline">Revoke Access</p>
								<p className="text-green-600 hover:underline">
									Edit Permissions
								</p>
							</td>
						</tr>
						<tr className="border-t border-gray-300 hover:bg-gray-50 cursor-pointer">
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
							<td className="p-4">READ, WRITE, DOWNLOAD, UPDATE, DELETE</td>
							<td className="p-4 flex flex-col cursor-pointer font-semibold">
								<p className="text-red-600 hover:underline">Revoke Access</p>
								<p className="text-green-600 hover:underline">
									Edit Permissions
								</p>
							</td>
						</tr>
						<tr className="border-t border-gray-300 hover:bg-gray-50 cursor-pointer">
							<td className="p-4">
								<div className="flex items-center gap-2">
									<img
										src="https://i.pinimg.com/474x/9c/0f/06/9c0f06b14aba220811331c49718d6b93.jpg"
										className="w-8 h-8 rounded-full"
										alt="User Avatar"
									/>
									<p>John Doe</p>
								</div>
							</td>{" "}
							<td className="p-4">READ</td>
							<td className="p-4 flex flex-col cursor-pointer font-semibold">
								<p className="text-red-600 hover:underline">Revoke Access</p>
								<p className="text-green-600 hover:underline">
									Edit Permissions
								</p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
