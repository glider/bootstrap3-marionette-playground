define(function (require) {
	"use strict";

	var Marionette = require('backbone.marionette'),
		_ = require('underscore'),
		$ = require('jquery'),
		Backbone = require('backbone');

	var Dropdown = Marionette.ItemView.extend({
		className: 'input-group-btn',
		template: require('hbs!./template'),

		events: {
			'click .dropdown-menu-item': 'onSelect',
			'click .dropdown-toggle': 'onClick'
		},

		initialize: function(options) {
			_.bindAll(this, 'onClickDocument');
			this.btnTitle = options.title || '';
			this.align = options.align || 'left';
		},

		serializeData: function() {
			return {
				menuItems: this.collection.toJSON(),
				title: this.btnTitle,
				align: this.align
			};
		},

		toggle: function(state) {
			if (_.isUndefined(state)) {
				state = !this.isOpen();
			}
			this.$el.toggleClass('open', state);
			this.trigger('toggle', state);
			$('body')[state ? 'on' : 'off']('click', this.onClickDocument);
		},

		onClickDocument: function(e) {
			this.toggle(false);
		},

		onClick: function(e) {
			e.stopPropagation();
			this.toggle(!this.isOpen());
		},

		onSelect: function(e) {
			var id = $(e.currentTarget).data('value');
			e.stopPropagation();
			this.toggle(false);
			this.trigger('dropdown:select', id);
		},

		isOpen: function() {
			return this.$el.hasClass('open');
		}

	});

	return Dropdown;
});
