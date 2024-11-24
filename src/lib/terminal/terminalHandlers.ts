import {
	terminalPathDataStore,
	terminalStore,
	terminalSubmitStore
} from '$lib/stores/terminalStore';
import { get } from 'svelte/store';
import {
	cdCommand,
	challengeSubmitCommand,
	challengesCommand,
	echoCommand,
	helpCommand,
	lsCommand,
	pwdCommand
} from './terminalCommands';
import { getPrefixStyled, onStartArt } from './terminalUtils';
import { checkFlag } from '$lib/firebase/domainRepo';

export function clearTerminal() {
	terminalStore.set([]);
}

export async function handleTerminalCommand(command: string) {
	command = command.trim();
	if (get(terminalSubmitStore) === true) {
		const checkFlagResult = await checkFlag({
			id: get(terminalPathDataStore).challengeId!,
			flag: command
		});
		if (checkFlagResult) {
			addNewLineInTerminal(`Congrats! You have completed the challenge.`);
			terminalSubmitStore.set(false);
		} else {
			addNewLineInTerminal(`Wrong Flag! Try again.`);
			terminalSubmitStore.set(false);
		}
	} else if (command === 'challenges') {
		addNewLineInTerminal(`Opening Github Repository Containing Challenges...`);
		challengesCommand();
	} else if (command === 'clear') {
		clearTerminal();
	} else if (command === '') {
		// pass
	} else if (command === 'startup') {
		addNewLineInTerminal(`<pre class='text-fuchsia-500'>${onStartArt}</pre>`);
	} else if (command === 'help') {
		helpCommand();
	} else if (command.startsWith('echo')) {
		echoCommand(command.slice(5)); // remove 'echo'
	} else if (command === 'pwd') {
		pwdCommand();
	} else if (command.startsWith('ls')) {
		lsCommand(command.slice(3));
	} else if (command.startsWith('cd')) {
		cdCommand(command.slice(3).trim());
	} else if (command.endsWith('.sh')) {
		await challengeSubmitCommand(command.slice(0, -3));
		if (get(terminalSubmitStore) === true) {
			return;
		}
	} else {
		addNewLineInTerminal(`Command not found: ${command}`);
	}

	addEmptyCommand();
}

export function addCommandToLastLineInTerminal(command: string) {
	terminalStore.update((arr) => {
		arr[arr.length - 1] += command;
		return arr;
	});
}
export function addNewLineInTerminal(text: string) {
	terminalStore.update((arr) => {
		arr.push(text);
		return arr;
	});
}

export function addEmptyCommand() {
	terminalStore.update((arr) => {
		arr.push(getPrefixStyled());
		return arr;
	});
}
