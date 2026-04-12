export default function ResponseBubble({
	message,
	you
}: {
	message: string;
	you: boolean;
}) {
	return (
		<div
			className={`p-2 rounded-md ${you ? "bg-blue-500 text-white w-1/2 ml-auto" : "bg-gray-200 w-1/2 mr-auto"}`}
		>
			{message}
		</div>
	);
}
