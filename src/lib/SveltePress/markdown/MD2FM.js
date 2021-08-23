import fm from 'front-matter';

export default function md2fm(content) {
	return fm(content);
}
