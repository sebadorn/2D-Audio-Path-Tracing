'use strict';


/**
 * Sender.
 * @constructor
 * @param {Object} data
 */
var Sender = function( data ) {
	data.color = data.color || '#F19049';
	Point.call( this, data );

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
		source: 'square',
		volume: 0.5
	} );
};


/**
 * Play an animation visualizing the sound.
 */
Sender.prototype.playAnimation = function() {
	this._graphicAnim.alpha = 1;
	var tween = createjs.Tween.get( this._graphicAnim );
	tween.to( { scaleX: 5, scaleY: 5, alpha: 0 }, CFG.SOUND.TIME_DELTA - 250 );
	tween.to( { scaleX: 1, scaleY: 1 } );
};


/**
 * Play the sound.
 */
Sender.prototype.playSound = function() {
	this.sound.play( { pitch: 'Eb5', filter: { q: 15 } } );
};


Sender.prototype.constructor = Sender;