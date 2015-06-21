'use strict';


var Physics = {


	/**
	 * Calculate volume for the receiver and sender.
	 * @param  {Receiver} r
	 * @param  {Sender}   s
	 * @return {Number}
	 */
	volume: function( r, s ) {
		var dist = r.distance( s );
		var vol = 0;

		if( dist >= s.hearableDistance ) {
			vol = 0;
		}
		else if( dist === 0 ) {
			vol = 1;
		}
		else {
			vol = 1 - dist / s.hearableDistance;
		}

		return vol;
	}


};