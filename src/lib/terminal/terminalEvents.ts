import { terminalCurrentLineStore, terminalStore } from '$lib/stores/terminalStore';
import { onStartArt, getPrefixStyled } from './terminalUtils';
import { addCommandToLastLineInTerminal, handleTerminalCommand } from './terminalHandlers';
import { get } from 'svelte/store';

export function terminalOnStartEvent() {
	terminalStore.update((arr) => {
		arr = [];
		arr.push(getPrefixStyled());
		arr.push(`<pre class='text-fuchsia-500'>${onStartArt}</pre>`);
		arr.push(getPrefixStyled());		
		return arr;
	});
}

export async function terminalCommandEnterEvent() {
	const currentCommand = get(terminalCurrentLineStore);
	terminalCurrentLineStore.set('');
	addCommandToLastLineInTerminal(currentCommand);
	await handleTerminalCommand(currentCommand);
}
