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
	 * Play all sounds of the senders.
	 */
	playAllSounds: function() {
		for( var i = 0; i < this._sender.length; i++ ) {
			this._sender[i].playSound();
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
			this.playAllSounds();
			this._lastSound = Date.now();
		}
	}


};