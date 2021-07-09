// Sidebar functions used to get the name and url of
// a sidebar item

export function getName(value) {
	let name = value;
	if (typeof value === 'object' && value !== null && value.isGroup) {
		name = value.name;
	}
	return name;
}
export function getUrl(key, value) {
	let shouldRemove = key.toLowerCase().endsWith('/readme.md') ? 'readme.md' : '.';
	if (shouldRemove === '/readme.md' || (typeof value === 'object' && value !== null)) return null;
	const url = '/' + key.split(shouldRemove).slice(0, -1).join(shouldRemove);
	return url;
}
