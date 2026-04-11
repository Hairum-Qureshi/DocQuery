import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Conversation } from "../interfaces";

interface UseConversationHook {
	conversationsList: Conversation[] | undefined;
}

export default function useConversation(): UseConversationHook {
	const { data: conversationsList } = useQuery({
		queryKey: ["conversations-list"],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/conversation/all`,
					{
						withCredentials: true
					}
				);
				return response.data;
			} catch (error) {
				console.error(error);
			}
		}
	});

	return { conversationsList };
}
