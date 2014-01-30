/**
 * Entrypoint for MediaWiki "ValueView" extension JavaScript code. Adds an extension object to the
 * global MediaWiki object and does some configuration on the "valueview" jQuery module.
 *
 * @licence GNU GPL v2+
 * @author Daniel Werner < daniel.werner@wikimedia.de >
 */
/* global dataTypes */
( function( mw, dv, dt, $, vv ) {
	'use strict';

	mw.ext = mw.ext || {};

	var expertProvider = new vv.ExpertFactory();

	// Register valueview experts available by default:
	expertProvider.registerExpert(
		dv.StringValue,
		vv.experts.StringValue
	);

	expertProvider.registerExpert(
		dv.GlobeCoordinateValue,
		vv.experts.GlobeCoordinateValue
	);

	expertProvider.registerExpert(
		dv.QuantityValue,
		vv.experts.QuantityType
	);

	expertProvider.registerExpert(
		dv.TimeValue,
		vv.experts.TimeValue
	);

	// Experts for values for certain data types:
	// Those data types might not be defined, so check for them first.
	var commonsMediaType = dt.getDataType( 'commonsMedia' );
	if( commonsMediaType ) {
		expertProvider.registerExpert(
			commonsMediaType,
			vv.experts.CommonsMediaType
		);
	}

	var urlType = dt.getDataType( 'url' );
	if( urlType ) {
		expertProvider.registerExpert(
			urlType,
			vv.experts.UrlType
		);
	}

	/**
	 * Object representing the MeidaWiki "ValueView" extension.
	 *
	 * @since 0.1
	 */
	mw.ext.valueView = new ( function MwExtValueView() {
		/**
		 * Expert provider holding all jQuery.valueview experts globally available in MediaWiki
		 * context.
		 *
		 * @since 0.1
		 *
		 * @type jQuery.valueview.ExpertFactory
		 */
		this.expertProvider = expertProvider;
	} )();

	// "expertProvider", "valueParserProvider" and "valueFormatterProvider" are required options of
	// the jQuery.valueview widget.
	// If valueview is used in MediaWiki context, these option should not be required anymore and
	// default to the automatically generated providers.
	vv.prototype.options.expertProvider = expertProvider;
	vv.prototype.options.valueParserProvider = mw.ext.valueParsers.valueParserProvider;
	vv.prototype.options.valueFormatterProvider = mw.ext.valueFormatters.valueFormatterProvider;

}( mediaWiki, dataValues, dataTypes, jQuery, jQuery.valueview ) );
