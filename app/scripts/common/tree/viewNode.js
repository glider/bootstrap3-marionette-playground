define(function(require) {
	"use strict";

	var Marionette = require('backbone.marionette'),
		Backbone = require('backbone');

	var ViewNode = Marionette.CompositeView.extend({
		template: require('hbs!./tmplNode'),

		onRender: function() {
			console.info('Node::onRender', this);
		},

		serializeData: function() {
			return {
				hasChildren: this.model.hasChildren(),
				selectable: true, //TODO: условие
				d: this.model.toJSON()
			};
		}
	});

	return ViewNode;
});
