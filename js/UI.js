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
	 * Initialize events.
	 */
	_initEvents: function() {
		this._canvas.addEventListener( 'click', function( ev ) {
			Scene.positionReceiver( ev );
		} );

		this._canvas.addEventListener( 'contextmenu', function( ev ) {
			Scene.setReceiverOrientation( ev );
			ev.preventDefault();
		} );
	},


	/**
	 * Add a sender point.
	 * @param  {Sender}         s
	 * @return {createjs.Shape}   The created point.
	 */
	addSender: function( s ) {
		var shape = new createjs.Shape();
		shape.graphics.beginFill( s.color ).drawCircle( 0, 0, s.radius );
		shape.x = s.x;
		shape.y = s.y;

		var shapeAnim = new createjs.Shape();
		shapeAnim.graphics.setStrokeStyle( 1 );
		shapeAnim.graphics.beginFill( s.color );
		shapeAnim.graphics.drawCircle( 0, 0, s.radius );
		shapeAnim.alpha = 0;
		shapeAnim.x = s.x;
		shapeAnim.y = s.y;

		this._stage.addChild( shape, shapeAnim );
		s._graphic = shape;
		s._graphicAnim = shapeAnim;

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
		this._initEvents();
	},


	/**
	 * Set the receiver point.
	 * @param  {Receier}        r
	 * @return {createjs.Shape}   The created point.
	 */
	setReceiver: function( r ) {
		var shape = new createjs.Shape();
		shape.graphics.beginFill( r.color ).drawCircle( 0, 0, r.radius );
		shape.x = r.x;
		shape.y = r.y;

		this._stage.addChild( shape );
		r._graphic = shape;

		return shape;
	}


};