interface UseGoogleAuthHook {
	googleSignInMutation: () => Promise<void>;
	signOut: () => Promise<void>;
}

interface DocumentReference {
	fileName: string;
	url: string;
}

interface Conversation {
	_id: string;
	userID: string;
	title: string;
	documentReferences: DocumentReference[];
	participantEmails: string[];
	createdAt: string;
	updatedAt: string;
}

export type { UseGoogleAuthHook, Conversation };
