define(function (require) {
	"use strict";

	var _ = require('underscore'),
		Backbone = require('backbone'),
		Marionette = require("backbone.marionette"),
		App = require('application');

	require('bootstrap');

	var InputSelector = require('common/forms/inputSelector/index');
	var Dropdown = require('common/forms/dropdown/index');
	var ListButtons = require('common/forms/listButtons/index');

	var dropdownData = [
		{id: 86400, title: 'день'},
		{id: 604800, title: 'неделя'},
		{id: 1209600, title: '2 недели'},
		{id: 1814400, title: '3 недели'},
		{id: 2592000, title: 'месяц'}
	];

	var Forms = App.module('Forms', {
		startWithParent: false
	});

	Forms.Controller = Marionette.Controller.extend({
		initialize: function (options) {
			this.region = options.region;
		},

		showIndex: function (id) {
			var indexView = new Forms.ViewMain({});
			this.region.show(indexView);
		}
	});

	Forms.ViewMain = Marionette.Layout.extend({
		template: require('hbs!./tmplForm'),

		regions: {
			inputSelector: '#inputSelector',
			dropdown1:     '#dropdown1',
			listButtons1:  '#listButtons1',
			listButtons2:  '#listButtons2',
			listButtons3:  '#listButtons3'
		},

		onRender: function() {
			this.initDropdown();
			this.initInputSelector();
			this.initListButtons();
		},

		initDropdown: function () {
			var dropDown = new Dropdown({
				collection: new Backbone.Collection(dropdownData),
				title: 'Выпадающий список'
			});
			this.dropdown1.show(dropDown);
			dropDown.on('dropdown:select', function (id) {
				this.$('.dropdown1-result').html(id);
			}, this);
		},

		initInputSelector: function() {
			var inputSelector = new InputSelector({
				predefined: dropdownData,
				name: 'ttl'
			});
			this.inputSelector.show(inputSelector);
			inputSelector.on('change', function(value) {
				this.$('#inputSelector-result').html(value);
			},this);
		},

		initListButtons: function() {
			var listButtons1 = new ListButtons({
				data: dropdownData,
				mode: 'radio'
			});
			this.listButtons1.show(listButtons1);

			var listButtons2 = new ListButtons({
				data: dropdownData,
				mode: 'radio',
				selected: [1209600]
			});
			this.listButtons2.show(listButtons2);

			var listButtons3 = new ListButtons({
				data: dropdownData,
				mode: 'checkbox',
				selected: [1209600, 604800]
			});
			this.listButtons3.show(listButtons3);
		}
	});

	Forms.on('before:start', function () {
		this.controller = new Forms.Controller({
			region: App.regionMain
		});
	});

	Forms.on('start', function (id) {
		this.controller.showIndex(id);
	});

	return Forms;
});
