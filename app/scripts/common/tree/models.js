define(function (require) {
	"use strict";

	var Backbone = require('backbone'),
		_ = require('underscore');

	var Models = {};

	Models.Node = Backbone.Model.extend({
		idAttribute: "id",
		parentAttribute: "parentID",

		initialize: function () {
			this.children = undefined;
			this.listenTo(this, {
				'model:toggleSelect': this.toggleSelect
			}, this);
		},

		getParent: function () {
			var parentID = this.get(this.parentAttribute);
			return (parentID) ? this.collection.get(parentID) : null;
		},

		hasParent: function () {
			return !!this.getParent();
		},

		getChildren: function () {
			if (_.isUndefined(this.children)) {
				this.children = this.collection.getChildren(this.id);
			}
			return this.children;
		},

		getChildrenColl: function () {
			return this.collection.getChildrenColl(this.id);
		},

		hasChildren: function () {
			return !(_.isNull(this.getChildren()));
		},

		getTitle: function () {
			return this.get('Name');
		},

		isSelected: function () {
			return !!this.selected;
		},

		isChecked: function () {
			return this.hasChildren() ? _.all(_.invoke(this.getChildren(), 'isChecked')) : this.isSelected();
		},

		toggleSelect: function () {
			this.setSelected(!this.isChecked());
		},

		setSelected: function (status) {
			this.collection.visitCheckAll(this, status);
		},

		accept: function (visitor) {
			if (this.hasChildren()) {
				_.each(this.getChildren(), function (item) {
					item.accept(visitor);
				});
			}
			visitor.visitNode(this);
		},

		getPath: function () {
			var item = this, path = [];
			do {
				path.push(item.id);
				item = item.getParent();
			} while (item && !item.hasParent());
			return path;
		}

	});

	Models.NodeColl = Backbone.Collection.extend({
		model: Models.Node,

		initialize: function () {
			this.listenTo(this, 'model:toggleSelect', this.visitCalcCounters, this);
		},

		parse: function (data) {
			return data.items;
		},

		getRootModels: function () {
			var root = this.where({parentID: null});
			return new Models.NodeColl(root);
		},

		getChildren: function (id) {
			var ch = this.where({parentID: id});
			return ch.length ? ch : null;
		},

		getSelected: function () {
			return this.select(function (item) {
				return item.selected;
			});
		},

		getChildrenColl: function (id) {
			var children = this.getChildren(id) || [];
			return new Models.NodeColl(children);
		},

		comparator: function (model) {
			return model.getTitle("Name");
		},

		markSelected: function (selectedColl) {
			selectedColl.each(function (selectedItem) {
				var category = this.get(selectedItem.id);
				if (category) {
					category.toggleSelect();
				}
			}, this);
			this.visitCalcCounters();
		},

		visitCalcCounters: function () {
			var visitor = {
				visitNode: function (node) {
					node._countNodes = node.hasChildren() ? 0 : 1; // Узловые ноды не считаем.
					node._countChecked = !node.hasChildren() && node.isSelected() ? 1 : 0; // Узловые чекнутые не считаем.
					if (node.hasChildren()) {
						node._countNodes += _.reduce(node.getChildren(), function (acc, item) {
							return acc + item._countNodes;
						}, 0);
						node._countChecked += _.reduce(node.getChildren(), function (acc, item) {
							return acc + item._countChecked;
						}, 0);
					}
					var data = {total: node._countNodes, checked: node._countChecked};
					node.trigger('counters:update', data);
				}
			};
			_.invoke(this.getRootModels(), 'accept', visitor);
		},

		visitCheckAll: function (node, status) {
			node = (node instanceof this.model) ? node : this.get(node);
			var visitor = {
				visitNode: function (node) {
					if (node.selected !== status) {
						if (!node.hasChildren()) {
							node.selected = status;
						}
						node.trigger('model:selected', status);
					}
				}
			};
			node.accept(visitor);
		},

		visitExpandAll: function () {
			var visitor = {
				visitNode: function (node) {
					node.trigger('model:expand');
				}
			};
			_.invoke(this.getRootModels(), 'accept', visitor);
		}
	});

	return Models;
});
