define(function(require) {
	"use strict";

	var Marionette = require('backbone.marionette'),
		Backbone = require('backbone');
	var Dropdown = require('common/forms/dropdown/index');

	var hbs = require('handlebars');

	var Selector = Marionette.Layout.extend({
		template: require('hbs!./template'),

		regions: {
			dropdown: '.input-group'
		},

		ui: {
			input: 'input'
		},

		events: {
			'change input': 'onChange'
		},

		initialize: function(options) {
			this.options = options;
			this.predefined = new Backbone.Collection(options.predefined || {});
		},

		onRender: function() {
//			console.info('Selector::onRender');
			this.renderDropdown();
		},

		serializeData: function() {
			return {
				predefined: this.options.predefined,
				value: this.options.value,
				name: this.options.name
			};
		},

		renderDropdown: function() {
			var dropdown = new Dropdown({
				collection: new Backbone.Collection(this.options.predefined),
				align: 'right'

			});
			this.listenTo(dropdown, 'dropdown:select', this.onSelect);
			this.$('.input-group').append(dropdown.render().el);
		},

		onSelect: function(value) {
			console.info('onSelect: ', value);
			this.ui.input
				.val(value)
				.trigger('change');
		},

		onChange: function() {
			this.trigger('change', this.ui.input.val());
		}
	});

	return Selector;
});
