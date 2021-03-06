/**
 * @licence GNU GPL v2+
 * @author H. Snater < mediawiki@snater.com >
 */
( function( $, QUnit ) {
	'use strict';

	var defaultSource = [
		'a',
		'ab',
		'abc',
		'd',
		'EFG'
	];

	/**
	 * Factory creating a jQuery.ui.suggester widget suitable for testing.
	 *
	 * @param {Object} [options]
	 */
	var newTestSuggester = function( options ) {
		options = $.extend( {
			source: defaultSource
		}, options || {} );

		return $( '<input/>' )
			.addClass( 'test_suggester')
			.appendTo( 'body' )
			.suggester( options );
	};

	/**
	 * @return {ui.ooMenu}
	 */
	var createCustomMenu = function() {
		var $menu = $( '<ul/>' ).ooMenu( {
			customItems: [
				new $.ui.ooMenu.CustomItem( 'custom item' )
			]
		} );
		return $menu.data( 'ooMenu' );
	};

	QUnit.module( 'jquery.ui.suggester', {
		teardown: function() {
			var $suggester = $( '.test_suggester' ),
				suggester = $suggester.data( 'suggester' );
			if( suggester ) {
				suggester.destroy();
			}
			$suggester.remove();
		}
	} );

	QUnit.test( 'Create', function( assert ) {
		var $suggester = newTestSuggester();

		assert.ok(
			$suggester.data( 'suggester' ) instanceof $.ui.suggester,
			'Instantiated suggester.'
		);
	} );

	QUnit.test( '"menu" option', 2, function( assert ) {
		var customMenu = createCustomMenu();

		var $suggester = newTestSuggester( {
			menu: customMenu
		} );

		var suggester = $suggester.data( 'suggester' );

		QUnit.stop();

		$suggester
		.one( 'suggesteropen', function() {
			assert.equal(
				suggester.options.menu,
				customMenu
			);

			QUnit.start();
		} );

		$suggester.val( 'a' );
		suggester.search();

		customMenu = createCustomMenu();

		suggester.option( 'menu', customMenu );

		QUnit.stop();

		$suggester
		.one( 'suggesteropen', function() {
			assert.equal(
				suggester.options.menu,
				customMenu
			);

			QUnit.start();
		} );

		suggester.search();
	} );

	QUnit.test( 'search() gathering suggestions from an array', 1, function( assert ) {
		var $suggester = newTestSuggester(),
			suggester = $suggester.data( 'suggester' );

		$suggester.val( 'a' );

		QUnit.stop();

		suggester.search()
		.done( function( suggestions ) {
			assert.equal(
				suggestions.length,
				3,
				'Gathered suggestions from array.'
			);
		} )
		.fail( function() {
			assert.ok(
				false,
				'Failed gathering suggestions from array.'
			);
		} )
		.always( function() {
			QUnit.start();
		} );
	} );

	QUnit.test( 'search() gathering suggestions from a function', 1, function( assert ) {
		var $suggester = newTestSuggester( {
				source: function( term ) {
					var deferred = new $.Deferred();
					return deferred.resolve( [
						'suggestion 1',
						'suggestion 2'
					] ).promise();
				}
			} ),
			suggester = $suggester.data( 'suggester' );

		$suggester.val( 'a' );

		QUnit.stop();

		suggester.search()
		.done( function( suggestions ) {
			assert.equal(
				suggestions.length,
				2,
				'Gathered suggestions from function.'
			);
		} )
		.fail( function() {
			assert.ok(
				false,
				'Failed gathering suggestions from array.'
			);
		} )
		.always( function() {
			QUnit.start();
		} );
	} );

}( jQuery, QUnit ) );
