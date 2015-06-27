'use strict';


var Scene = {


	_lastSound: 0,
	_receiver: null,
	_sender: [],


	/**
	 * Add a sender.
	 * @param {Sender} s
	 */
	addSender: function( s ) {
		this._sender.push( s );
		UI.addSender( s );
	},


	/**
	 * Adjust all sounds of the senders.
	 */
	adjustSounds: function() {
		for( var i = 0; i < this._sender.length; i++ ) {
			var s = this._sender[i];
			var vol = Physics.volume( this._receiver, s );

			s.playAnimation();
			s.setSound( {
				volume: vol
			} );
		}
	},


	/**
	 * Start the main loop.
	 */
	mainLoop: function() {
		createjs.Ticker.framerate = CFG.SIMULATION.TICKS;
		createjs.Ticker.addEventListener( 'tick', function( ev ) {
			if( ev.paused ) {
				return;
			}

			Scene.simulate( ev );
		} );
	},


	/**
	 * Position the receiver where the mouse clicked.
	 * @param {MouseEvent} ev
	 */
	positionReceiver: function( ev ) {
		if( this._receiver ) {
			console.debug( '[Scene.positionReceiver]' +
				' Receiver pos:', ev.clientX, ev.clientY );

			this._receiver.setPos( ev.clientX, ev.clientY );
		}
	},


	/**
	 * Set the receiver.
	 * @param {Receiver} r
	 */
	setReceiver: function( r ) {
		this._receiver = r;
		UI.setReceiver( r );
	},


	/**
	 * Simulate.
	 * @param {Event} ev Tick event.
	 */
	simulate: function( ev ) {
		UI.draw( ev );

		if( ev.timeStamp - this._lastSound >= CFG.SOUND.TIME_DELTA ) {
			this.adjustSounds();
			this._lastSound = Date.now();
		}
	}


};