'use strict';


/**
 * Point.
 * @constructor
 * @param {Object} data
 */
var Point = function( data ) {
	this.radius = data.radius || 10;
	this.x = data.x || (this.radius * 2);
	this.y = data.y || (this.radius * 2);
	this.color = data.color || '#CC1E69';
	this._graphic = null;
};


Point.prototype = {


	_graphic: null,
	_graphicAnim: null,
	color: '#000000',
	radius: 0,
	x: 0,
	y: 0,


	/**
	 * Calculate the euclidean distance to the given point q.
	 * @param  {Point}  q
	 * @return {Number}
	 */
	distance: function( q ) {
		var diffX = this.x - q.x;
		var diffY = this.y - q.y;

		return Math.sqrt( diffX * diffX + diffY * diffY );
	}


};