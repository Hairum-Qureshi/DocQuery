import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import type { Message } from "../interfaces";

interface UseMessagingHook {
	sendMessageMutation: ({
		query,
		conversation_id
	}: {
		query: string;
		conversation_id: string;
	}) => Promise<void>;
	convoMessages: Message[];
}

export default function useMessaging(): UseMessagingHook {
	const { convoID } = useParams();
	const queryClient = useQueryClient();

	const { mutateAsync } = useMutation({
		mutationFn: async ({
			query,
			conversation_id
		}: {
			query: string;
			conversation_id: string;
		}) => {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/message/${conversation_id}/new-message`,
					{ message: query },
					{
						withCredentials: true
					}
				);

				console.log(response.data);
				return response.data;
			} catch (error) {
				console.error("Error sending message:", error);
				throw new Error("Failed to send message");
			}
		},
		onSuccess: () => {
			if (convoID)
				queryClient.invalidateQueries({ queryKey: ["messages", convoID] });
		}
	});

	const sendMessageMutation = async ({
		query,
		conversation_id
	}: {
		query: string;
		conversation_id: string;
	}): Promise<void> => {
		await mutateAsync({ query, conversation_id });
	};

	const { data: convoMessages } = useQuery({
		queryKey: ["messages", convoID],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/message/${convoID}/all`,
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

	return { sendMessageMutation, convoMessages };
}
