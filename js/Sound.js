'use strict';


/**
 * Sound.
 * @constructor
 * @param {String}   source  Audio (ogg) encoded in base64.
 * @param {Object}   options
 * @param {Function} cb
 */
var Sound = function( source, options, cb ) {
	this._id = ++Sound._instanceCounter;

	this._audioBuffer = null;
	this._context = null;
	this._gainNode = null;

	this.options = {
		volumeMaster: options.volumeMaster || 1.0
	};

	this._initContext();
	this._loadSound( source, cb );
};


Sound._instanceCounter = 0;


/**
 * Initialize the audio context.
 */
Sound.prototype._initContext = function() {
	try {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		this._context = new AudioContext();
	}
	catch( exc ) {
		console.error( '[Sound._initContext (' + this._id + ')]' +
			' WebAudio API not supported in this browser!' );
	}
};


/**
 * Load the sound.
 * @param {String}   source
 * @param {Function} cb
 */
Sound.prototype._loadSound = function( source, cb ) {
	var dataScheme = 'data:audio/ogg;base64,';

	if( source.indexOf( dataScheme ) === 0 ) {
		console.debug( '[Sound._loadSound (' + this._id + ')]' +
			' Removing audio/ogg data scheme.' );

		source = source.substr( dataScheme.length );
	}

	var buffer = Base64Binary.decodeArrayBuffer( source );

	this._context.decodeAudioData( buffer, function( audioData ) {
		console.debug( '[Sound._loadSound (' + this._id + ')] Loaded.' );

		this._audioBuffer = audioData;
		cb && cb();
	}.bind( this ), function( err ) {
		console.error( '[Sound._loadSound (' + this._id + ')]', err );
	} );
};


/**
 * Play the sound.
 */
Sound.prototype.play = function() {
	this._gainNode = this._context.createGain();

	var source = this._context.createBufferSource();
	source.buffer = this._audioBuffer;
	source.loop = true;
	source.connect( this._gainNode );
	this._gainNode.connect( this._context.destination );

	this.setVolume( 0 );
	source.start( 0 );
};


/**
 * Set the sound volume.
 * @param {Number} vol New volume.
 */
Sound.prototype.setVolume = function( vol ) {
	if( vol >= 0 ) {
		this._gainNode.gain.value = vol * this.options.volumeMaster;
	}
};