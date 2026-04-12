export default function ResponseBubble({
	message,
	you
}: {
	message: string;
	you: boolean;
}) {
	return you ? (
		<div
			className={`self-end bg-blue-600 text-white px-4 py-2 rounded-lg max-w-[80%] whitespace-pre-wrap wrap-break-word`}
		>
			{message}
		</div>
	) : (
		<div
			className={`self-start bg-gray-200 text-gray-800 px-4 py-2 rounded-lg max-w-[80%] whitespace-pre-wrap wrap-break-word`}
			dangerouslySetInnerHTML={{ __html: message }}
		/>
	);
}
