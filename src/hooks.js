import { getSide } from '$lib/SveltePress/SveltePressData';

// Sidebar gets saved in session
export function getSession() {
	return getSide();
}
