define(function (require) {
	"use strict";

	var Marionette = require('backbone.marionette');

	var ViewNode = Marionette.CompositeView.extend({
		template: require('hbs!./tmplNode'),
		itemView: '.children',

		initialize: function() {
			this.collection = this.model.getChildren();
		},

		onRender: function () {
			console.info('Node::onRender', this);

		},

		serializeData: function () {
			return {
				hasChildren: this.model.hasChildren(),
				selectable: true, //TODO: условие
				d: this.model.toJSON()
			};
		}
	});

	var ViewTree = Marionette.CompositeView.extend({
		template: require('hbs!./tmplTree'),
		className: 'tree',
		itemView: ViewNode,

		initialize: function(options) {
			this.collTree = options.collection;
			this.collection = this.collTree.getRootModels();
		}
	});

	return ViewTree;
});
