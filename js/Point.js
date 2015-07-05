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
	_graphicDir: null,
	color: '#000000',
	orientation: {
		x: 0,
		y: 0
	},
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
	},


	/**
	 * Set the orientation.
	 * @param {Number} x
	 * @param {Number} y
	 */
	setOrientation: function( x, y ) {
		this.orientation.x = x;
		this.orientation.y = y;

		this.setPos( this.x, this.y );
	},


	/**
	 * Set a new position.
	 * @param {Number} x
	 * @param {Number} y
	 */
	setPos: function( x, y ) {
		this.x = x;
		this.y = y;

		if( this._graphic ) {
			this._graphic.x = x;
			this._graphic.y = y;
		}

		if( this._graphicAnim ) {
			this._graphicAnim.x = x;
			this._graphicAnim.y = y;
		}

		if( this._graphicDir ) {
			this._graphicDir.graphics.clear();
			this._graphicDir.graphics.setStrokeStyle( 2 );
			this._graphicDir.graphics.beginStroke( this.color );
			this._graphicDir.graphics.moveTo( 0, 0 );
			this._graphicDir.graphics.lineTo( this.orientation.x * 15.0, this.orientation.y * 15.0 );
			this._graphicDir.graphics.endStroke();

			// Move line outside of the radius of the point.
			// The line is supposed to hover a little in front of it.
			this._graphicDir.x = x + this.orientation.x * ( this.radius + 1.0 );
			this._graphicDir.y = y + this.orientation.y * ( this.radius + 1.0 );
		}
	}


};