<?php

/**
 * Entry point for the "ValueView" extension.
 *
 * Documentation: https://www.mediawiki.org/wiki/Extension:ValueView
 * Support        https://www.mediawiki.org/wiki/Extension_talk:ValueView
 * Source code:   https://gerrit.wikimedia.org/r/gitweb?p=mediawiki/extensions/DataValues.git
 *
 * @since 0.1
 *
 * @file
 * @ingroup ValueView
 *
 * @licence GNU GPL v2+
 * @author Daniel Werner < daniel.werner@wikimedia.de >
 */

if ( defined( 'ValueView_VERSION' ) ) {
	// Do not initialize more then once.
	return;
}

define( 'ValueView_VERSION', '0.1 alpha' );

if ( defined( 'MEDIAWIKI' ) ) {
	include __DIR__ . '/ValueView.mw.php';
}
