define(function(require) {
	'use strict';

	var Backbone = require('backbone'),
		Marionette = require("backbone.marionette"),
		$ = require('jquery'),
		Communicator = require('communicator');

	var App = new Marionette.Application();

	App.helpers = {};

	/* Add application regions here */
	App.addRegions({
		regionMain: '#container'
	});

	/* Add initializers here */
	App.addInitializer( function () {
	});

	Communicator.mediator.on("routing:start", function() {
		Backbone.history.start();
	});

	Communicator.mediator.on("auth:required", function () {
		App.Router.navigate('login', { trigger: true, replace: true });
	});

	Communicator.mediator.on("auth:logout", function () {
		App.Router.navigate('login', { trigger: true, replace: true });
	});

	Communicator.mediator.on("auth:login", function () {
		App.Router.navigate('', { trigger: true, replace: true });
	});
/*
	Communicator.mediator.on("shops:list", function () {
		App.Router.navigate('', { trigger: true, replace: true });
	});
*/
	Communicator.mediator.on("shop:selected", function (id) {
		App.Router.navigate('shop/'+id, { trigger: true, replace: true });
	});

	// ajax settings
	$.ajaxSetup({
		contentType: 'application/json',
		dataType: 'json',

		statusCode: {
			401: function () {
				// Redirect the to the login page.
				console.warn('401 status');
				Communicator.mediator.trigger("auth:required");
			}
		},

		beforeSend: function() {
			App.poolSize = App.poolSize + 1;
			$('#loading-indicator').show();
		},
		complete: function() {
			App.poolSize = App.poolSize - 1;
			if (!App.poolSize) {
				$('#loading-indicator').hide();
			}
		}
	});

	$('.brand').on('click', function() {
		App.Router.navigate('index');
//		Communicator.mediator.trigger("shops:list");
	});

	return App;
});
