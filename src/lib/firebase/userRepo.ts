import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { getFirestoreFirebase, userCollection } from './firestore';
import { roleType, type UserSchema } from './schemas';
import { get } from 'svelte/store';
import { userStore } from './userStore';

export const getUserFromFirestore = async (email: string) => {
	const db = getFirestoreFirebase();
	const userRef = doc(db, userCollection, email);
	const userSnap = await getDoc(userRef);
	if (userSnap.exists()) {
		return userSnap.data() as UserSchema;
	} else {
		return undefined;
	}
};

export const createUserInFirestore = async (
	email: string,
	name: string,
	registerNumber: number
) => {
	const user: UserSchema = {
		email,
		name,
		registerNumber,
		role: roleType.STUDENT,
		createdAt: new Date(),
		challengeCompleted: [],
	};
	const db = getFirestoreFirebase();
	const docRef = doc(db, userCollection, email);
	await setDoc(docRef, user);
};

export const checkUserCompletedChallenge = async ({
	email,
	challengeId
}: {
	email: string;
	challengeId: string;
}) => {
	const db = getFirestoreFirebase();
	const userRef = doc(db, userCollection, email);
	const userSnap = await getDoc(userRef);
	if (userSnap.exists()) {
		const challengeCompleted: string[] = (await userSnap.get('challengeCompleted')) ?? [];
		return challengeCompleted.includes(challengeId);
	} else {
		return false;
	}
};

export const updateUserDetails = async (userData: FormData) => {
	const db = getFirestoreFirebase();
	const userRef = doc(db, userCollection, get(userStore)?.email ?? '');
	const userSnap = await getDoc(userRef);
	if (userSnap.exists()) {
		await updateDoc(userRef, {
			name: userData.get('name'),
			dept: userData.get('dept'),
			section: userData.get('section'),
			year: userData.get('year'),
			phone: userData.get('phone'),
			registerNumber: userData.get('registerNumber')
		});
		return true;
	}
	return false;
};

export const getAllUsers = async () => {
	const db = getFirestoreFirebase();
	const usersRef = await getDocs(collection(db, userCollection));
	let userData: {
		name: string;
		registerNumber: number;
		challengesCompleted: string[];
		score: number;
	}[] = [];
	usersRef.forEach((doc) => {
		const data = doc.data() as UserSchema;
		userData.push({
			name: data.name,
			registerNumber: data.registerNumber,
			challengesCompleted: data.challengeCompleted ?? [],
			score: 0
		});
	});
	return userData;
};
