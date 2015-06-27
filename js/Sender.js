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

	this.sound = null;
	this._initSound( data, cb );
};


Sender.prototype = Object.create( Point.prototype );


/**
 * Initalize the sound object.
 */
Sender.prototype._initSound = function( data, cb ) {
	this.sound = new Sound( data.source, data, function() {
		this.sound.play();
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
 * Play the sound.
 */
Sender.prototype.setSound = function( options ) {
	if( options.volume >= 0 ) {
		this.sound.setVolume( options.volume );
	}
};


Sender.prototype.constructor = Sender;