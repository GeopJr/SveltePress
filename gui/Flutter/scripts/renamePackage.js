import { execSync } from 'child_process';
import Config from '../../../sveltePress.config.js';

execSync(
	'flutter pub run change_app_package_name:main dev.geopjr.sveltepress.' +
		Config.title.replace(/[^a-z]/gi, '').toLowerCase(),
	{ stdio: 'inherit' }
);
