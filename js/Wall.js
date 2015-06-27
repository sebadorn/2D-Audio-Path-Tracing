'use strict';


/**
 * Wall.
 * @constructor
 * @param {Object} data
 */
var Wall = function( data ) {
	// Starting point.
	this.x0 = data.x0;
	this.y0 = data.y0;
	// Ending point.
	this.x1 = data.x1;
	this.y1 = data.y1;

	this.material = data.material;
	this.thickness = data.thickness;
};


Wall.prototype.intersect = function( ray ) {

};