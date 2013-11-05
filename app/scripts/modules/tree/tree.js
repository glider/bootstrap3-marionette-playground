define(function (require) {
	"use strict";

	var _ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require("backbone.marionette"),
		App = require('application');

	var WTree = require('common/tree/index');

	var nodes = [
		{id: 'MainInfo', title: 'Общая информация', parentID: null},
		{id: 'Site', title: 'Основные атрибуты', parentID: 'MainInfo'},
		{id: 'Feeds', title: 'Фиды', parentID: 'Site'},
		{id: 'Zones', title: 'Разделы (сайт-зоны)', parentID: 'Site'},
		{id: 'Auditory', title: 'Аудитории (сегменты)', parentID: 'MainInfo'},
		{id: 'Events', title: 'События', parentID: 'Auditory'},
		{id: 'EventSources', title: 'Источники событий', parentID: 'Auditory'}
	];
	var Tree = App.module('Tree', {
		startWithParent: false
	});

	Tree.Controller = Marionette.Controller.extend({
		initialize: function (options) {
			this.region = options.region;
		},

		showIndex: function () {
			var indexView = new Tree.ViewMain({});
			this.region.show(indexView);
		}
	});

	Tree.ViewMain = Marionette.Layout.extend({
		template: require('hbs!./tmplTree'),

		regions: {
			treeSimple: '.treeSimple',
			treeCB: '.treeCB'
		},

		onRender: function () {
			this.showSimpleTree();
		},

		showSimpleTree: function() {
			var coll = new WTree.Models.NodeColl({items: nodes}, {parse: true});
			var tree = new WTree.ViewTree({collection: coll.getRootModels()});
			this.treeSimple.show(tree);
		}
	});

	Tree.on('before:start', function () {
		this.controller = new Tree.Controller({
			region: App.regionMain
		});
	});

	Tree.on('start', function (id) {
		this.controller.showIndex(id);
	});

	return Tree;
});
