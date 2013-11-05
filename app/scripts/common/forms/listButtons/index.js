define(function (require) {
	"use strict";

	var _ = require('underscore'),
		$ = require('jquery'),
		Backbone = require('backbone'),
		Marionette = require("backbone.marionette");

	var ItemView = Marionette.ItemView.extend({
		tagName: 'button',
		className: 'btn btn-default',
		template: function () {
			return "";
		},
		onRender: function() {
			var d = this.model.toJSON();
			this.$el
				.attr({title: d.title, 'data-id': d.id})
				.val(d.id)
				.text(d.title);
			if (d.isActive) {
				this.$el.addClass('active');
			}
		}
	});

	return Marionette.CollectionView.extend({
		className: 'btn-group',
		itemView: ItemView,

		'events': {
			'click .btn': 'onChangeHandler'
		},

		initialize: function initialize() {
			this.mode = this.options.mode || 'radio'; // radio | checkbox
			this.collection = new Backbone.Collection(this.options.data || []);
			if (this.options.selected) {
				var selected = _.toArray(this.options.selected);
				_.forEach(selected, function(id) {
					var item = this.collection.get(id);
					if (item) {
						item.set('isActive', true);
					}
				}, this);
			}
			_.bindAll(this, 'onChange', 'onChangeHandler');
		},

		onChangeHandler: function onChangeHandler(e) {
			if (this.options.mode === 'radio') {
				this.$('.btn').removeClass('active');
			}
			$(e.target).toggleClass('active');
			this.onChange();
		},

		onChange: function onChange() {
			var ids = _.map(this.$('.btn.active'), function (elm) {
				return $(elm).val();
			});
			if (this.options.mode === 'radio') {
				ids = _.first(ids);
			}
			this.trigger('change', ids);
		},

		setCurrent: function setCurrent(id, options) {
			options = _.extend({}, options);
			this.$('.btn').removeClass('active');
			this.$('.btn[data-id="' + id + '"]').addClass('active');
			if (!options.silent) {
				this.onChange();
			}
		}
	});
});
