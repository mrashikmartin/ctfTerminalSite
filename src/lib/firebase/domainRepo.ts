import {
	collection,
	doc,
	documentId,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where
} from 'firebase/firestore';
import {
	challengeCollections,
	domainCollections,
	getFirestoreFirebase,
	userCollection
} from './firestore';
import {
	challengeType,
	type challengeSchema,
	type domainDataSchema,
	type domainSchema
} from './schemas';
import { challengesStore, domainStore } from '$lib/stores/firebaseStore';
import { getAuthFirebase } from './auth';
import { checkUserCompletedChallenge } from './userRepo';

export const getDomains = async () => {
	const db = getFirestoreFirebase();
	const domainsRef = await getDocs(collection(db, domainCollections));
	const domainData: domainSchema[] = [];
	domainsRef.forEach(async (doc) => {
		domainData.push({
			id: doc.id,
			data: doc.get('data') as domainDataSchema[]
		});
	});
	domainStore.set(domainData);
};

export const checkFlag = async ({ id, flag }: { id: string; flag: string }) => {
	const db = getFirestoreFirebase();
	const docRef = doc(db, challengeCollections, id);
	const challengeSnap = await getDoc(docRef);
	if (challengeSnap.exists()) {
		const result = challengeSnap.get('solution') === flag.trim();
		if (result) {
			const auth = getAuthFirebase();
			const user = auth.currentUser;
			const userDocRef = doc(db, userCollection, user?.email as string);
			const userDocSnap = await getDoc(userDocRef);
			if (userDocSnap.exists()) {
				const challengeCompleted: string[] = userDocSnap.get('challengeCompleted') ?? [];
				if (
					(await checkUserCompletedChallenge({ challengeId: id, email: user?.email as string })) ===
					false
				) {
					await updateDoc(userDocRef, {
						challengeCompleted: [...challengeCompleted, id]
					});
				}
			}
		}
		return result;
	}
	return false;
};

export const getChallengesDataToStore = async (challenges: string[]) => {
	const db = getFirestoreFirebase();

	const challengesQuery = query(
		collection(db, challengeCollections),
		where(documentId(), 'in', challenges)
	);

	const querySnapShot = await getDocs(challengesQuery);
	challengesStore.set([]);
	querySnapShot.forEach((doc) => {
		challengesStore.update((value) => {
			value.push(doc.data() as challengeSchema);
			return value;
		});
	});
};

export const getChallengesData = async (challenges: string[]) => {
	const db = getFirestoreFirebase();
	if (challenges.length === 0) {
		return [];
	}
	const challengesQuery = query(
		collection(db, challengeCollections),
		where(documentId(), 'in', challenges)
	);
	const querySnapShot = await getDocs(challengesQuery);
	const result: challengeSchema[] = [];
	querySnapShot.forEach((doc) => {
		result.push(doc.data() as challengeSchema);
	});
	return result;
};

export const calculateScore = async (challenges: string[]) => {
	const challengesData = await getChallengesData(challenges);
	let score = 0;
	challengesData.forEach((challenge) => {
		if (challenge.type === challengeType.EASY) {
			score += 5;
		} else if (challenge.type === challengeType.MEDIUM) {
			score += 10;
		} else {
			score += 15;
		}
	});
	return score;
};
