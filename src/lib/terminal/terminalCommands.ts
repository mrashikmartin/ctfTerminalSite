import { challengeType } from '$lib/firebase/schemas';
import { domainStore } from '$lib/stores/firebaseStore';
import {
	terminalPathDataStore,
	terminalPathStore,
	terminalStore,
	terminalSubmitStore
} from '$lib/stores/terminalStore';
import { get } from 'svelte/store';

export function helpCommand() {
	const terminal = get(terminalStore);
	terminal.push('Available commands:');
	terminal.push('help - shows this help');
	terminal.push('clear - clears the terminal');
	terminal.push('echo - echos the input');
	terminal.push(
		'ls - lists the files in the current directory <span class="text-red-500">(Nested Directories do not work)</span>'
	);
	terminal.push(
		'cd - changes the current directory <span class="text-red-500">(Nested Directories do not work)</span>'
	);
	terminal.push("{challenge_name}.sh - let's you submit flag for the challenge");
	terminal.push('pwd - prints the current directory');
	terminal.push('startup - prints startup art');
	terminal.push('challenges - opens github repository containing the challenges');
}

export function echoCommand(text: string) {
	const terminal = get(terminalStore);
	terminal.push(text);
}

export function pwdCommand() {
	const terminal = get(terminalStore);
	const terminalPath = get(terminalPathStore);
	terminal.push(terminalPath);
}

export const lsCommand = (command: string) => {
	const terminal = get(terminalStore);
	terminal.push('Listing Directories');
	const res = [];
	const terminalPathData = get(terminalPathDataStore);
	const domainData = get(domainStore);
	if (terminalPathData.domain === undefined) {
		domainData.forEach((domain) => {
			res.push(domain.id);
		});
	} else if (terminalPathData.type === undefined) {
		res.push(challengeType.EASY);
		res.push(challengeType.MEDIUM);
		res.push(challengeType.HARD);
	} else if (terminalPathData.challenge === undefined) {
		domainData.forEach((domain) => {
			if (domain.id === terminalPathData.domain) {
				domain.data
					.filter((e) => e.type === terminalPathData.type?.toString())
					.forEach((challenge) => {
						res.push(challenge.name + '.sh');
					});
			}
		});
	}
	res.forEach((item) => {
		terminal.push(item);
	});
};

export const cdCommand = (command: string) => {
	const terminal = get(terminalStore);
	const domainData = get(domainStore);
	const terminalPathData = get(terminalPathDataStore);
	let directoryFoundFlag = false;
	if (command === '..') {
		if (terminalPathData.type !== undefined) {
			terminalPathDataStore.update((data) => {
				data.type = undefined;
				return data;
			});
		} else if (terminalPathData.domain !== undefined) {
			terminalPathDataStore.update((data) => {
				data.domain = undefined;
				return data;
			});
		}
		directoryFoundFlag = true;
		return;
	}
	domainData.forEach((domain) => {
		if (domain.id === command && terminalPathData.domain === undefined) {
			terminalPathDataStore.update((data) => {
				data.domain = domain.id;
				return data;
			});
			directoryFoundFlag = true;
			return;
		} else if (
			terminalPathData.domain === domain.id &&
			(command === challengeType.EASY ||
				command === challengeType.MEDIUM ||
				command === challengeType.HARD)
		) {
			terminalPathDataStore.update((data) => {
				data.type = command;
				return data;
			});
			directoryFoundFlag = true;
			return;
		}
	});
	if (!directoryFoundFlag) {
		terminal.push(`No such directory : ${command}`);
	}
};

export const challengeSubmitCommand = async (command: string) => {
	const terminal = get(terminalStore);
	const terminalPathData = get(terminalPathDataStore);
	const domainData = get(domainStore);
	let challengeFoundFlag = false;
	domainData.forEach(async (domain) => {
		if (domain.id === terminalPathData.domain) {
			domain.data.forEach(async (challenge) => {
				if (challenge.name === command) {
					challengeFoundFlag = true;
					terminalPathDataStore.update((data) => {
						data.challenge = challenge.name;
						data.challengeId = challenge.id;
						return data;
					});
					terminalSubmitStore.set(true);
					terminal.push(`Enter the Flag : `);
					return;
				}
			});
		}
	});
	if (!challengeFoundFlag) {
		terminal.push(`No such challenge : ${command}`);
	}
};

export const challengesCommand = () => {
	const challengesRepoUrl = 'https://github.com/SarveshAadhithya/eec.gdsc.ctf';
	window.open(challengesRepoUrl, '_blank');
};
