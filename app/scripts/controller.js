define(function(require) {
	"use strict";

	var App = require('application');

	// Предзагрузка модулей.
//	require('modules/auth/auth');
//	require('modules/shops/shops');
//	require('modules/shop/shop');

	return {
		goto_index: function() {
			require(['modules/index/index'], function () {
				if(App.module('Index')) {
					App.module('Index').stop();
				}
				var index = App.module('Index');
				index.start();
			});
		},

		goto_form: function() {
			require(['modules/form/form'], function () {
				if (App.module('Forms')) {
					App.module('Forms').stop();
				}
				var form = App.module('Forms');
				form.start();
			});
		},

		goto_list: function () {
			require(['modules/list/list'], function () {
				if (App.module('List')) {
					App.module('List').stop();
				}
				var list = App.module('List');
				list.start();
			});
		},

		goto_tree: function () {
			require(['modules/tree/tree'], function () {
				if (App.module('Tree')) {
					App.module('Tree').stop();
				}
				var tree = App.module('Tree');
				tree.start();
			});
		},

		goto_grid: function () {
			require(['modules/grid/index'], function () {
				if (App.module('Grid')) {
					App.module('Grid').stop();
				}
				var grid = App.module('Grid');
				grid.start();
			});
		}
	};
});
