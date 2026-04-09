import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { FileWithPath } from "react-dropzone";

interface UseFormHook {
	createConversationWithFiles: (
		title: string,
		participants: string,
		documents: readonly FileWithPath[]
	) => void;
}

export default function useForm(): UseFormHook {
	const { mutate: createConversationWithFilesMutate } = useMutation({
		mutationFn: async ({
			title,
			participants,
			documents
		}: {
			title: string;
			participants: string;
			documents: readonly FileWithPath[];
		}) => {
			try {
				const formData = new FormData();
				formData.append("conversationTitle", title);
				formData.append("participants", participants);
				documents.forEach(file => {
					formData.append("documents", file);
				});

				console.log(formData.getAll("documents"));

				const response = await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/conversation/new/with-file-documents`,
					formData,
					{
						withCredentials: true
					}
				);

				return response.data;
			} catch (error) {
				console.error("Error creating conversation:", error);
				throw new Error("Failed to create a new conversation with files");
			}
		}
	});

	function createConversationWithFiles(
		title: string,
		participants: string,
		documents: readonly FileWithPath[]
	) {
		if (!title.trim()) return alert("Conversation title cannot be empty");
		if (documents.length === 0)
			return alert("Please upload at least one document");

		createConversationWithFilesMutate({
			title,
			participants,
			documents
		});
	}

	return { createConversationWithFiles };
}
