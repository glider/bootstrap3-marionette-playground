require.config({

	baseUrl: "/scripts",

	/* starting point for application */
	deps: ['backbone.marionette' /*,'marionette.handlebars'*/],

	shim: {
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},

		bootstrap: {
			deps: ['jquery'],
			exports: 'jquery'
		},

		'backbone.deepmodel': {
			deps: ['backbone'],
			exports: 'Backbone.DeepModel'
		},

		'Backbone.CollectionBinder': {
			deps: ['backbone', 'jquery', 'underscore', 'Backbone.ModelBinder'],
			exports: 'Backbone.CollectionBinder'
		},

		'pnotify': {
			deps: ['jquery'],
			exports: 'pnotify'
		}
	},

	paths: {
		jquery: '../bower/jquery/jquery',
		backbone: '../bower/backbone-amd/backbone',
		underscore: '../bower/underscore-amd/underscore',

		'backbone.deepmodel': '../bower/backbone-deep-model/distribution/deep-model',
		'backbone-pageable': '../bower/backbone-pageable/lib/backbone-pageable',

		// Backbone.ModelBinder
		'Backbone.ModelBinder': '../bower/Backbone.ModelBinder/Backbone.ModelBinder',
		'Backbone.CollectionBinder': '../bower/Backbone.ModelBinder/Backbone.CollectionBinder',

		/* alias all marionette libs */
		'backbone.marionette': '../bower/backbone.marionette/lib/core/amd/backbone.marionette',
		'backbone.wreqr': '../bower/backbone.wreqr/lib/amd/backbone.wreqr',
		'backbone.babysitter': '../bower/backbone.babysitter/lib/amd/backbone.babysitter',

		/* alias the bootstrap js lib */
//		bootstrap: 'vendor/bootstrap',
		bootstrap: '../bower/bootstrap/dist/js/bootstrap',

		/* Alias text.js for template loading and shortcut the templates dir to tmpl */
		text: '../bower/requirejs-text/text',
//		tmpl: "../templates",

		/* handlebars from the require handlerbars plugin below */
		handlebars: '../bower/require-handlebars-plugin/Handlebars',

		/* require handlebars plugin - Alex Sexton */
		i18nprecompile: '../bower/require-handlebars-plugin/hbs/i18nprecompile',
		json2: '../bower/require-handlebars-plugin/hbs/json2',
		hbs: '../bower/require-handlebars-plugin/hbs',

		/* marionette and handlebars plugin */
		'marionette.handlebars': '../bower/backbone.marionette.handlebars/backbone.marionette.handlebars',

		'pnotify': './widgets/pnotify/jquery.pnotify.min'
	},

	hbs: {
		disableI18n: true,
		helperPathCallback: function (name) {
			"use strict";
			return 'common/hbs.helpers/' + name;
		}
	}
});

require([
	'backbone',
	'application',
	'router',
	'communicator',
	'regionManager'
],
	function ( Backbone, App, appRouter, Communicator ) {
	'use strict';

	App.addInitializer(function () {
		App.Router = appRouter;
		return Communicator.mediator.trigger("routing:start");
	});

	App.start();
});
