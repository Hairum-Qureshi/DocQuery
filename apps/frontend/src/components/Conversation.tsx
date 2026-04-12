export default function Conversation({
	title,
	active = false
}: {
	title: string;
	active?: boolean;
}) {
	return (
		<div
			className={`group flex items-center gap-3 px-4 py-2 mb-2 rounded-lg cursor-pointer transition-all duration-200
			${
				active
					? "bg-white/15 text-white shadow-sm border border-white/20"
					: "text-white/80 hover:bg-white/10 hover:border-white/20 border border-transparent"
			}`}
		>
			<div className="w-2 h-2 rounded-full bg-blue-300 opacity-70 group-hover:opacity-100 transition-opacity"></div>

			<span className="flex-1 truncate font-medium">{title}</span>
		</div>
	);
}
