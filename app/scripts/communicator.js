define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	require('backbone.marionette');

	var Communicator = Backbone.Marionette.Controller.extend({
		initialize: function(options) {
			// create a pub sub
			this.mediator = new Backbone.Wreqr.EventAggregator();

			//create a req/res
			this.reqres = new Backbone.Wreqr.RequestResponse();

			// create commands
			this.command = new Backbone.Wreqr.Commands();
		}
	});

	return new Communicator();
});
