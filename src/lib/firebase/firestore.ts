import { getFirestore } from 'firebase/firestore';
import { getFirebaseApp } from './config';

export const getFirestoreFirebase = () => {
	const firebaseApp = getFirebaseApp();
	const db = getFirestore(firebaseApp);
	return db;
};

export const userCollection = "users";
export const domainCollections = "domains";
export const challengeCollections = "challenges";