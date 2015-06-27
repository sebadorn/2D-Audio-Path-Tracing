'use strict';


/**
 * 2D ray.
 * @param {Object} origin
 * @param {Object} direction
 */
var Ray = function( origin, direction ) {
	this.origin = {
		x: origin.x || 0.0,
		y: origin.y || 0.0
	};
	this.direction = {
		x: direction.x || 1.0,
		y: direction.y || 1.0
	};

	this.normalize();
};


/**
 * Normalize the direction vector.
 * @return {Ray} The ray.
 */
Ray.prototype.normalize = function() {
	var od = {
		x: this.direction.x - this.origin.x,
		y: this.direction.y - this.origin.y
	};
	var l = Math.sqrt( od.x * od.x + od.y * od.y );

	this.direction.x /= l;
	this.direction.y /= l;

	return this;
};