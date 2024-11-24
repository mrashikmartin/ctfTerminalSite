import { derived, writable } from 'svelte/store';

export const terminalStore = writable<string[]>([]);

export const terminalCurrentLineStore = writable<string>('');

export const terminalPathDataStore = writable<{
	challenge?: string;
	domain?: string;
	type?: string;
	challengeId?:string;
}>({});

export const terminalPathStore = derived(terminalPathDataStore, ($terminalPathDataStore) => {
	let res = '/';
	if ($terminalPathDataStore.domain !== undefined) {
		res += $terminalPathDataStore.domain + '/';
	}
	if ($terminalPathDataStore.type !== undefined) {
		res += $terminalPathDataStore.type.toString() + '/';
	}
	return res;
});

export const terminalSubmitStore = writable<boolean>(false);
