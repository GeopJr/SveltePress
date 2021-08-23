import gi from 'node-gtk';
const Gtk = gi.require('Gtk', '3.0');
import Index from '../../../src/lib/SveltePress/db/sveltePressIndex.js';
import { mdConverter } from '../../../src/lib/SveltePress/markdown/MDConverter.js';
import Config from '../../../sveltePress.config.js';
import gladeFile from './ui.glade';

const title = Config.title;

gi.require('WebKit');

gi.startLoop();
Gtk.init();

const builder = Gtk.Builder.newFromString(gladeFile, -1);
const win = builder.getObject('mainwindow');
const webkitview = builder.getObject('webkit');
const webkitParent = builder.getObject('webkitParent');

function injectKitFix(content) {
	const head =
		'<html><head><style>html,body{max-height: 768px;max-width:768px;padding:1rem;}img{max-width: 100%; max-height: 100%}</style></head>';
	const body = `<body>${content}</body></html>`;
	return head + body;
}

const webSettings = webkitview.getSettings();
webSettings.allowFileAccessFromFileUrls = true;
webkitview.loadHtmlString(
	injectKitFix(`<h1>Welcome to ${title}</h1>`),
	'text/html',
	'utf-8',
	'file://'
);

const handlers = {
	onWindowShow: Gtk.main,
	onWindowDestroy: Gtk.mainQuit,
	renderWebview: function (x) {
		webkitParent.setPolicy(2, 2);
		webkitParent.unsetPlacement();
		const path = builder.getObject(x.getName().replace('__ROW__', '__DATA__'));

		const html = mdConverter(Index.get(path.getText())).replace(
			/\<img.+src=[\"|\'](?!https?:\/\/)(.+?)[\"|\']/gi,
			'<img src="assets$1"'
		);

		const injectedHtml = injectKitFix(html);

		webkitview.executeScript('window.scrollTo(0, 0);');
		webkitview.loadHtmlString(injectedHtml, 'text/html', 'utf-8', 'file://');
		webkitview.executeScript('window.scrollTo(0, 0);');
		webkitParent.setPlacement(0);
		webkitParent.setPolicy(0, 0);
		webkitParent.getVadjustment().setValue(0);
		webkitParent.getHadjustment().setValue(0);
		// webkitParent.getVadjustment().setPageSize(webkitParent.getAllocation().height)
		// webkitParent.getHadjustment().setPageSize(webkitParent.getAllocation().width)
	}
};

builder.connectSignals(handlers);

win.setDefaultSize(600, 400);

win.showAll();
