'use strict';


/**
 * Receiver.
 * @constructor
 * @param {Object} data
 */
var Receiver = function( data ) {
	data.color = data.color || '#84E5E3';
	Point.call( this, data );

	this.orientation = {
		x: 0,
		y: 1
	};
};


Receiver.prototype = Object.create( Point.prototype );


Receiver.prototype.constructor = Receiver;


/**
 * Set the orientation.
 * @param {Number} x
 * @param {Number} y
 */
Receiver.prototype.setOrientation = function( x, y ) {
	this.orientation.x = x;
	this.orientation.y = y;

	console.debug('[Receiver.setOrientation] x: ' + x + ' y: ' + y);
};