'use strict';


/**
 * Sender.
 * @constructor
 * @param {Object} data
 */
var Sender = function( data ) {
	data.color = data.color || '#F19049';
	Point.call( this, data );

	this.hearableDistance = data.hearableDistance || 100;
	this.pitch = data.pitch || 'A4';

	this.sound = null;
	this._initSound();
};


Sender.prototype = Object.create( Point.prototype );


/**
 * Initalize the sound object.
 */
Sender.prototype._initSound = function() {
	this.sound = new Wad( {
		env: {
			attack: 0.01,
			decay: 0.005,
			sustain: 0.2,
			hold: 0.015,
			release: 0.3
		},
		filter: {
			type: 'lowpass',
			frequency: 1200,
			q: 8.5,
			env: {
				attack: 0.2,
				frequency: 600
			}
		},
		source: 'square'
	} );
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
Sender.prototype.playSound = function( options ) {
	if( options.volume > 0 ) {
		this.sound.play( {
			pitch: this.pitch,
			filter: { q: 15 },
			volume: options.volume
		} );
	}
};


Sender.prototype.constructor = Sender;