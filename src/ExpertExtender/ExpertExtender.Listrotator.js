/**
 * @license GNU GPL v2+
 * @author Adrian Lang <adrian.lang@wikimedia.de>
 */
( function( $, ExpertExtender ) {
	'use strict';

	/**
	 * An ExpertExtender module for a jQuery.ui.listrotator
	 *
	 * @constructor
	 *
	 * @param {string} className
	 * @param {object[]} values
	 * @param {function} onValueChange
	 * @param {function} getUpstreamValue
	 */
	ExpertExtender.Listrotator = function( className, values, onValueChange, getUpstreamValue ) {
		this._onValueChange = onValueChange;
		this._getUpstreamValue = getUpstreamValue;

		var $rotator = $( '<div/>' )
			.addClass( className )
			.listrotator( {
				values: values,
				deferInit: true
			} );
		this.rotator = $rotator.data( 'listrotator' );
	};

	$.extend( ExpertExtender.Listrotator.prototype, {
		_onValueChange: null,
		_getUpstreamValue: null,

		rotator: null,

		/**
		 * Callback for the init ExpertExtender event
		 *
		 * @param {jQuery} $extender
		 */
		init: function( $extender ) {
			var self = this,
				listrotatorEvents = 'listrotatorauto listrotatorselected';

			this.rotator.element
				.on( listrotatorEvents, function( event, newValue ) {
					if( newValue !== self._getUpstreamValue() ) {
						self._onValueChange( newValue );
					}
				} )
				.appendTo( $extender );

			this.rotator.initWidths();
		},

		/**
		 * Callback for the draw ExpertExtender event
		 */
		draw: function() {
			var value = this._getUpstreamValue();
			if( value && this.rotator.autoActive() ) {
				this.rotator.value( value );
				this.rotator._setValue( value );
			}
		},

		/**
		 * Callback for the destroy ExpertExtender event
		 */
		destroy: function() {
			if( this.rotator ) {
				this.rotator.destroy();
				this.rotator = null;
			}
			this._getUpstreamValue = null;
			this._onValueChange = null
		},

		/**
		 * Get the current value set in the rotator
		 *
		 * @return {string|null} The current value or null, if autoActive
		 */
		getValue: function() {
			return this.rotator.autoActive() ? null : this.rotator.value();
		},
	} );

} ( jQuery, jQuery.valueview.ExpertExtender ) );
