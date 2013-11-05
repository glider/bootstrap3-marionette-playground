define(function (require) {
	"use strict";

	var _ = require('underscore'),
//		Backbone = require('backbone'),
		Marionette = require("backbone.marionette"),
		App = require('application');

	var Grid = App.module('Grid', {
		startWithParent: false
	});

	Grid.Controller = Marionette.Controller.extend({
		initialize: function (options) {
			this.region = options.region;
		},

		showGrid: function (id) {
			var indexView = new Grid.ViewMain({});
			this.region.show(indexView);
		}
	});

	Grid.ViewMain = Marionette.Layout.extend({
		template: require('hbs!./tmplIndex')
	});

	Grid.on('before:start', function () {
		this.controller = new Grid.Controller({
			region: App.regionMain
		});
	});

	Grid.on('start', function (id) {
		this.controller.showGrid(id);
	});

	return Grid;
});
