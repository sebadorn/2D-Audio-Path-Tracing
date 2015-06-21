'use strict';


var UI = {


	_canvas: null,
	_stage: null,


	/**
	 * Initialize the canvas.
	 */
	_initCanvas: function() {
		this._canvas = document.getElementById( 'stage' );
		this.handleResize();

		window.addEventListener( 'resize', this.handleResize.bind( this ) );
	},


	/**
	 * Add a sender point.
	 * @param  {Sender}         s
	 * @return {createjs.Shape}   The created point.
	 */
	addSender: function( s ) {
		var shape = new createjs.Shape();
		shape.graphics.beginFill( s.color ).drawCircle( s.x, s.y, s.radius );

		this._stage.addChild( shape );
		s._graphic = shape;

		return shape;
	},


	/**
	 * Draw the stage.
	 * @param {Event} ev Tick event.
	 */
	draw: function( ev ) {
		this._stage && this._stage.update();
	},


	/**
	 * Handle window resize events.
	 * @param {Event} ev
	 */
	handleResize: function( ev ) {
		this._canvas.width = window.innerWidth;
		this._canvas.height = window.innerHeight;

		this._stage && this._stage.update();
	},


	/**
	 * Initialize the frontend.
	 */
	init: function() {
		this._initCanvas();
		this._stage = new createjs.Stage( 'stage' );
	},


	/**
	 * Set the receiver point.
	 * @param  {Receier}        r
	 * @return {createjs.Shape}   The created point.
	 */
	setReceiver: function( r ) {
		var shape = new createjs.Shape();
		shape.graphics.beginFill( r.color ).drawCircle( r.x, r.y, r.radius );

		this._stage.addChild( shape );
		r._graphic = shape;

		return shape;
	}


};