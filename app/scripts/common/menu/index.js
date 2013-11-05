define(function (require) {
	"use strict";

	var Marionette = require('backbone.marionette'),
		Backbone = require('backbone');

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
		template: require('hbs!./tmplMenuItem'),
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

		onRender: function () {
			if (this.currentModel) {
				this.currentModel.trigger('listView:activate', true);
				this.collection.trigger('listView:changeCurrent', this.currentModel);
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
			this.collection.trigger('listView:changeCurrent', model);
		}
	});

	Menu.VertView = Menu.View.extend({
		className: "nav nav-tabs nav-stacked"
	});

	Menu.TabsView = Menu.View.extend({
		className: "nav nav-tabs"
	});

	return Menu;
});

