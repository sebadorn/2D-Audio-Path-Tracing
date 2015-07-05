'use strict';


/**
 * Sender.
 * @constructor
 * @param {Object} data
 */
var Sender = function( data, cb ) {
	data.color = data.color || '#F19049';
	Point.call( this, data );

	this.hearableDistance = data.hearableDistance || 100;

	this.orientation.x = 1.0;
	this.orientation.y = 0.0;
	this.sound = null;
	this._initSound( data, cb );
};


Sender.prototype = Object.create( Point.prototype );


/**
 * Initalize the sound object.
 */
Sender.prototype._initSound = function( data, cb ) {
	this.sound = new Sound( data.source, data, function() {
		this.sound.play( this );
		cb && cb( this );
	}.bind ( this ) );
};


/**
 * Play an animation visualizing the sound.
 */
Sender.prototype.playAnimation = function() {
	// Make visible.
	this._graphicAnim.alpha = 0.3;

	var tween = createjs.Tween.get( this._graphicAnim );
	var duration = CFG.SOUND.TIME_DELTA - 250;
	var scale = this.hearableDistance / this.radius;

	// Grow bigger while fading out.
	// Looks like an extending circle/wave.
	tween.to( {
		alpha: 0,
		scaleX: scale,
		scaleY: scale
	}, duration );

	// Reset.
	tween.to( {
		scaleX: 1,
		scaleY: 1
	} );
};


/**
 * Update various sound nodes that depend on the position
 * of the receiver.
 * @param {Receiver} r
 */
Sender.prototype.updateListener = function( r ) {
	this.sound._context.listener.setPosition( r.x, r.y, 0 );
	this.sound._context.listener.setOrientation(
		r.orientation.x, r.orientation.y, 0, // center
		0, 0, -1 // up
	);

	this.sound._pannerNode.setOrientation(
		r.x - this.x,
		r.y - this.y,
		0
	);
};


/**
 * Set orientation.
 * @param {Number} x
 * @param {Number} y
 */
Sender.prototype.setOrientation = function( x, y ) {
	this.orientation.x = x;
	this.orientation.y = y;
};


/**
 * Play the sound.
 * @param {Object} options
 */
Sender.prototype.setSound = function( options ) {
	if( options.volume >= 0 ) {
		this.sound.setVolume( options.volume );
	}
};


Sender.prototype.constructor = Sender;