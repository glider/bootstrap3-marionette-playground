define(function (require) {
	"use strict";

	var _ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require("backbone.marionette"),
		App = require('application');

	var Menu = require('common/menu_v3/index');

	var sections = [
		{id: 'MainInfo', title: 'Общая информация'},
		{id: 'Site', title: 'Основные атрибуты'},
		{id: 'Feeds', title: 'Фиды'},
		{id: 'Zones', title: 'Разделы (сайт-зоны)'},
		{id: 'Auditory', title: 'Аудитории (сегменты)'},
		{id: 'Events', title: 'События'},
		{id: 'EventSources', title: 'Источники событий'}
	];
	var List = App.module('List', {
		startWithParent: false
	});

	List.Controller = Marionette.Controller.extend({
		initialize: function (options) {
			this.region = options.region;
		},

		showIndex: function () {
			var indexView = new List.ViewMain({});
			this.region.show(indexView);
		}
	});

	List.ViewMain = Marionette.Layout.extend({
		template: require('hbs!./tmplList'),

		regions: {
			vertMenu: '.vertMenu',
			tabsMenu: '.tabsMenu'
		},

		onRender: function() {
			var viewMenu2 = new Menu.TabsView({
				collection: new Backbone.Collection(sections),
				current: 'Site'
			});
			this.listenTo(viewMenu2, 'listView:changeCurrent', this.changeTabsSection);
			this.tabsMenu.show(viewMenu2);

			var viewMenu1 = new Menu.VertView({
				collection: new Backbone.Collection(sections),
				current: 'Auditory'
			});
			this.listenTo(viewMenu1, 'listView:changeCurrent', this.changeVertSection);
			this.vertMenu.show(viewMenu1);
		},

		changeTabsSection: function (tabID) {
			this.$('.tabsMenuContent').html('Выбран пункт ' + tabID);
		},

		changeVertSection: function (tabID) {
			this.$('.vertMenuContent').html('Выбран пункт ' + tabID);
		}
	});

	List.on('before:start', function () {
		this.controller = new List.Controller({
			region: App.regionMain
		});
	});

	List.on('start', function (id) {
		this.controller.showIndex(id);
	});

	return List;
});
