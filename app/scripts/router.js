define(function(require) {
	"use strict";

	var Marionette = require("backbone.marionette"),
		controller = require("controller");

	var AppRouter = Marionette.AppRouter.extend({
		appRoutes: {
			"form": "goto_form",
			"list": "goto_list",
			"tree": "goto_tree",
			"": "goto_index"
		}
	});

	return new AppRouter({controller: controller});
});
