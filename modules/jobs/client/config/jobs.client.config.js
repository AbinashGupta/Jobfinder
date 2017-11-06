'use strict';

// Configuring the Jobs module
angular.module('jobs').run(['menuService',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', {
          title: 'Show Jobs',
          state: 'listJob',
          roles: ['*']
        });
		Menus.addMenuItem('topbar', {
          title: 'Add Jobs',
          state: 'createJob',
          roles: ['user', 'admin']
        });
	}
]);