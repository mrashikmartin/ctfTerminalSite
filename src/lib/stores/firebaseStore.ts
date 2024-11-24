import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { type challengeSchema, type domainSchema } from '$lib/firebase/schemas';
import { writable } from 'svelte/store';

export const authStateStore = writable<boolean>(false);
export const authInitStateStore = writable<boolean>(false);
export const domainStore = writable<domainSchema[]>(undefined);
export const challengesStore = writable<challengeSchema[]>([]);

authStateStore.subscribe((value) => {
	if (browser) {
		if (value === true) {
			goto('/');
		} else {
			goto('/signup');
		}
	}
});
