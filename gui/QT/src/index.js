import {
	QMainWindow,
	QWidget,
	FlexLayout,
	QIcon,
	QListWidget,
	QListWidgetItem,
	ItemFlag,
	QTextBrowser,
	QVariant,
	QTabWidget
} from '@nodegui/nodegui';
import Config from '../../../sveltePress.config';
import Sidebar from '../../../src/lib/SveltePress/db/sveltePressSidebar';
import Index from '../../../src/lib/SveltePress/db/sveltePressIndex';
import { mdConverter } from '../../../src/lib/SveltePress/markdown/MDConverter.js';

import bullet from '../bullet.svg';
import SveltePressLogo from '../../sveltepresslogo.png';

const win = new QMainWindow();
const centralWidget = new QWidget();
const rootLayout = new FlexLayout();
const tabWidget = new QTabWidget();
const textBrowser = new QTextBrowser();

textBrowser.setHtml(`<h1>Welcome to ${Config.title}</h1>`);

for (const [key, value] of Sidebar) {
	const listWidget = new QListWidget();
	let name = key;
	for (const [keyP, valueP] of value) {
		let listWidgetItem = new QListWidgetItem();
		if (keyP.toLowerCase() === key + '/readme.md') {
			name = valueP.name;
		} else {
			listWidgetItem.setText(valueP.name);
			listWidgetItem.setFlags(listWidgetItem.flags() & ~ItemFlag.ItemIsSelectable);
			listWidget.addItem(listWidgetItem);
		}
		for (const [keyC, valueC] of valueP.files) {
			listWidgetItem = new QListWidgetItem();
			listWidgetItem.setText(valueC);
			listWidgetItem.setIcon(new QIcon(bullet));
			listWidgetItem.setData(256, new QVariant(keyC));
			listWidget.addItem(listWidgetItem);
		}
	}
	// Create Tabs
	// [TODO]: get a cool icon
	tabWidget.addTab(listWidget, new QIcon(), name);
	// Add event listener for posts
	listWidget.addEventListener('itemActivated', (item) => {
		if (!item.isSelected()) return;
		const path = item.data(256).toString();
		textBrowser.setHtml(
			mdConverter(Index.get(path)).replace(
				/\<img.+src=[\"|\'](?!https?:\/\/)(.+?)[\"|\']/gi,
				'<img src="assets/$1"'
			)
		);
	});

	listWidget.setObjectName('sidebar');
}

centralWidget.setObjectName('root');
centralWidget.setLayout(rootLayout);
rootLayout.addWidget(tabWidget);
rootLayout.addWidget(textBrowser);
textBrowser.setObjectName('view');

win.setWindowTitle(`${Config.title}`);
win.resize(800, 600);
win.setMinimumSize(600, 300);
win.setWindowIcon(new QIcon(SveltePressLogo));
win.setCentralWidget(centralWidget);
win.setStyleSheet(
	`
    #root {
      height: '100%';
      flex: 1;
      flex-direction: row;
    }
    #view {
      flex: 50;
    }
    #sidebar {
      flex: 1;
      height: '100%';
    }
    #mylabel {
      font-size: 16px;
      font-weight: bold;
      padding: 1;
    }
  `
);
win.show();

global.win = win;
