import { authStateStore } from '../stores/firebaseStore';
import { getFirebaseApp } from './config';
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword
} from 'firebase/auth';
import { userStore } from './userStore';
import { getUserFromFirestore } from './userRepo';

export const signUpFirebase = async ({ email, password }: { email: string; password: string }) => {
	try {
		const auth = getAuthFirebase();
		const authResult = await createUserWithEmailAndPassword(auth, email, password);
		const user = authResult.user;
		return true;
	} catch (e) {
		return false;
	}
};

export const getAuthFirebase = () => {
	const firebaseApp = getFirebaseApp();
	const auth = getAuth(firebaseApp);
	return auth;
};
onAuthStateChanged(getAuthFirebase(), async (user) => {
	if (user) {
		authStateStore.set(true);
		const userData = await getUserFromFirestore(user.email ?? '');

		if (userData) {
			userStore.set(userData);
		}
	} else {
		authStateStore.set(false);
	}
});

export const signOutFirebase = async () => {
	try {
		const auth = getAuthFirebase();
		await auth.signOut();
		return true;
	} catch (e) {
		return false;
	}
};

export const signInFirebase = async ({ email, password }: { email: string; password: string }) => {
	try {
		const auth = getAuthFirebase();
		const authResult = await signInWithEmailAndPassword(auth, email, password);
		const user = authResult.user;
		return true;
	} catch (e) {
		return false;
	}
};
