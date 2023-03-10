import { writable } from 'svelte/store';

function createModal() {
	const { subscribe, set, update } = writable({
        isOpen: false,
        
    });

	return {
		subscribe,
		open: () => update(isOpen => isOpen = true),
		close: () => update(),
		reset: () => set(false)
	};
}

export const modal = createModal();