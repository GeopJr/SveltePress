const fs = require('fs-extra');

const name = fs.readJsonSync('./deploy/config.json').appName;

const platforms = ['linux', 'win32', 'darwin'];
for (const folder of platforms) {
	if (!fs.pathExistsSync('./deploy/' + folder + '/' + name + '/')) break;
	const assetsFolder = `./deploy/${folder}/${name}/${
		folder === 'darwin' ? 'Contents/' : ''
	}assets/`;
	if (fs.pathExistsSync(assetsFolder)) {
		fs.removeSync(assetsFolder);
	}
	fs.copySync('./assets/', assetsFolder);
}
