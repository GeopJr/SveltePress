import createPressData from './src/lib/SveltePress/functions/dataGenerator.js';
import createSidebar from './src/lib/SveltePress/functions/sidebarGenerator.js';

// This function generated the following databases
// - Index
// - SearchIndex
// - Sidebar

// Should be run at least once on dev
// and before every prod build
// package.json has been modified to do so.

createPressData('./pages/', true, true);
console.log('\x1b[33m%s\x1b[0m', '[SveltePress]: Generated pressData');
createSidebar(true);
console.log('\x1b[33m%s\x1b[0m', '[SveltePress]: Generated sidebar');
