'use strict';


/**
 * Receiver.
 * @constructor
 * @param {Object} data
 */
var Receiver = function( data ) {
	data.color = data.color || '#84E5E3';
	Point.call( this, data );

	this.orientation.x = 0.0
	this.orientation.y = 1.0;
};


Receiver.prototype = Object.create( Point.prototype );


Receiver.prototype.constructor = Receiver;