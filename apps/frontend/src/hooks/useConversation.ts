import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Conversation } from "../interfaces";
import { useParams } from "react-router-dom";

interface UseConversationHook {
	conversationsList: Conversation[] | undefined;
	conversationData: Conversation | undefined;
}

export default function useConversation(): UseConversationHook {
	const { convoID } = useParams();

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

	const { data: conversationData } = useQuery({
		queryKey: ["conversation", convoID],
		queryFn: async () => {
			try {
				if (!convoID) return undefined;

				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/conversation/${convoID}`,
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

	return { conversationsList, conversationData };
}
