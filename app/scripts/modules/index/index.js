define(function (require) {
	"use strict";

	var _ = require('underscore'),
//		Backbone = require('backbone'),
		Marionette = require("backbone.marionette"),
		App = require('application');

	var Index = App.module('Index', {
		startWithParent: false
	});

	Index.Controller = Marionette.Controller.extend({
		initialize: function (options) {
			this.region = options.region;
		},

		showIndex: function (id) {
			var indexView = new Index.ViewMain({});
			this.region.show(indexView);
		}
	});

	Index.ViewMain = Marionette.Layout.extend({
		template: require('hbs!./tmplIndex')
	});

	Index.on('before:start', function () {
		this.controller = new Index.Controller({
			region: App.regionMain
		});
	});

	Index.on('start', function (id) {
		this.controller.showIndex(id);
	});

	return Index;
});
