'use strict';


/**
 * Receiver.
 * @constructor
 * @param {Object} data
 */
var Receiver = function( data ) {
	data.color = data.color || '#84E5E3';
	Point.call( this, data );
};


Receiver.prototype = Object.create( Point.prototype );


Receiver.prototype.constructor = Receiver;