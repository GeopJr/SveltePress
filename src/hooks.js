import { getSide, getNav } from '$lib/SveltePress/SveltePressData';

// Sidebar & navbar gets saved in session
export function getSession() {
	return new Map([
		['sidebar', getSide()],
		['navbar', getNav()]
	]);
}
