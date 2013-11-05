define(function (require) {
	"use strict";

	var Marionette = require('backbone.marionette'),
		Backbone = require('backbone');

	var hbs = require('handlebars');

	var Menu = {};

	Menu.ModelItem = Backbone.Model.extend({
		defaults: {
			id: '',
			title: ''
		},

		getTitle: function() {
			return this.get('title');
		}
	});

	Menu.CollItems = Backbone.Collection.extend({
		model: Menu.Model
	});

	Menu.ItemView = Marionette.ItemView.extend({
		template: hbs.compile("<a>{{title}}</a>"),
		tagName: 'li',

		modelEvents: {
			'listView:activate': 'activate'
		},

		events: {
			click: 'onClick'
		},

		onRender: function () {
			this.$el.data('id', this.model.id);
		},

		onClick: function () {
			this.model.trigger('listView:select', this.model);
		},

		activate: function (status) {
			this.$el.toggleClass('active', !!status);
		}
	});

	Menu.ItemVerticalView = Menu.ItemView.extend({
		className: 'list-group-item',
		template: hbs.compile("{{title}}")
	});

	Menu.View = Marionette.CompositeView.extend({
		tagName: 'ul',
		className: "nav",
		template: function () {
			return "";
		},
		itemView: Menu.ItemView,

		collectionEvents: {
			'listView:select': 'onSelect',
			'sort': 'render'
		},

		initialize: function(options) {
			this.current = options.current || null;
		},

		onRender: function () {
			if (this.current) {
				this.currentModel = this.collection.get(this.current);
				this.currentModel.trigger('listView:activate', true);
				this.trigger('listView:changeCurrent', this.currentModel.id);
			}
		},

		onSelect: function (model) {
			if (this.currentModel && this.currentModel === model) {
				return;
			}
			if (this.currentModel) {
				this.currentModel.trigger('listView:activate', false);
			}
			this.currentModel = model;
			if (this.currentModel) {
				this.currentModel.trigger('listView:activate', true);
			}
			this.trigger('listView:changeCurrent', model.id);
		}
	});

	Menu.VertView = Menu.View.extend({
		className: "list-group list-menu",
		itemView: Menu.ItemVerticalView
	});

	Menu.TabsView = Menu.View.extend({
		className: "nav nav-tabs"
	});

	return Menu;
});

