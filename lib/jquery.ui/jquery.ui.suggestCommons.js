/**
 * Commons suggester.
 * Enhances an input box with suggestion functionality for Wikimedia Commons asset names.
 * @licence GNU GPL v2+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @example $( 'input' ).suggestCommons();
 *
 * @dependency jQuery.ui.suggester
 * @dependency jQuery.util.highlightMatchingCharacters
 */
( function( $ ) {
	'use strict';

	$.widget( 'ui.suggestCommons', $.ui.suggester, {

		/**
		 * @see ui.suggester._create
		 */
		_create: function() {
			if( !this.options.source ) {
				this.options.source = this._initDefaultSource();
			}
			$.ui.suggester.prototype._create.call( this );
		},

		/**
		 * Initializes the default source pointing the "opensearch" API module on Wikimedia Commons.
		 *
		 * @return {Function}
		 */
		_initDefaultSource: function() {
			return function( term ) {
				var deferred = $.Deferred();

				$.ajax( {
					url: location.protocol + '//commons.wikimedia.org/w/api.php',
					dataType: 'jsonp',
					data: {
						search: term,
						action: 'opensearch',
						namespace: 6
					},
					timeout: 8000
				} )
				.done( function( response ) {
					deferred.resolve( response[1], response[0] );
				} )
				.fail( function( jqXHR, textStatus ) {
					// Since this is a JSONP request, this will always fail with a timeout...
					deferred.reject( textStatus );
				} );

				return deferred.promise();
			};
		},

		/**
		 * @see jQuery.ui.suggester._createMenuItemFromSuggestion
		 */
		_createMenuItemFromSuggestion: function( suggestion, requestTerm ) {
			suggestion = suggestion.replace( /^File:/, '' );

			var label = suggestion;

			if( requestTerm ) {
				label = $.util.highlightMatchingCharacters( requestTerm, suggestion );
			}

			return new $.ui.ooMenu.Item( label, suggestion );
		}

	} );

}( jQuery ) );
