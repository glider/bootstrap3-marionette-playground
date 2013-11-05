define(function (require) {
	"use strict";

	var Marionette = require('backbone.marionette'),
		_ = require('underscore');

	var Tree = {};

	Tree.Models = require('./models');

	Tree.ViewNode = Marionette.CompositeView.extend({
		tagName: 'li',
		template: require('hbs!./tmplNode'),
		itemViewContainer: '.node-children',

		ui: {
			expander: '>.node-title .expander',
			children: '>.node-children'
		},

		events: {
			'click >.node-title .expander': 'onToggleExpand'
		},

		initialize: function (options) {
			this.collection = this.model.getChildrenColl();
			this.listenTo(this.model, {
//				'model:selected': this.check,
				'model:expand': this.expand,
				'model:collapse': this.collapse
//				'counters:update': this.updateCounters
			}, this);
			this.expanded = _.isUndefined(options.expanded) ? false : options.expanded;
		},

		serializeData: function () {
			return {
				hasChildren: this.model.hasChildren(),
				selectable: true, //TODO: условие
				d: this.model.toJSON()
			};
		},

		onRender: function() {
			if (this.expanded) {
				this.expand(true);
			}
		},

		onToggleExpand: function (e) {
			e.stopPropagation();
			this[this.expanded ? 'collapse' : 'expand']();
		},

		expand: function (isForce) {
			if (this.model.hasChildren() && (isForce || !this.expanded)) {
				this.ui.expander.removeClass('glyphicon-plus').addClass('glyphicon-minus');
				this.ui.children.slideDown('fast');
				this.expanded = true;
			}
		},

		collapse: function (isForce) {
			if (this.model.hasChildren() && (isForce || this.expanded)) {
				this.ui.expander.removeClass('glyphicon-minus').addClass('glyphicon-plus');
				this.ui.children.slideUp('fast');
				this.expanded = false;
			}
		}
	});

	Tree.ViewTree = Marionette.CompositeView.extend({
		className: 'tree',
		template: require('hbs!./tmplTree'),
		itemView: Tree.ViewNode,
		itemViewContainer: 'ul.tree-root'
	});

	Tree.ViewCBTree = Tree.ViewTree.extend({

	});

	return Tree;
});
