"use strict";

var canvas;
var gl;

var theta = 0.0;
var thetaLoc;
var speed=1.0;
var N=200+1;
var r=1.0;
var vertices=[];
var speed=1.0;

function changeSpeed(){
	speed=document.getElementById("speed").value;
}

function initDola(){
	canvas = document.getElementById( "canvas" );
	gl = WebGLUtils.setupWebGL( canvas, "experimental-webgl" );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	var program = initShaders( gl, "rot-v-shader", "rot-f-shader" );
	gl.useProgram( program );

	for (var i = 0; i <= N; i++) {//lian
			    var thetas = i * 2 * Math.PI / N;
			    var x = r * Math.sin(thetas);
			    var y = r * Math.cos(thetas);
			    vertices.push(x, y);
	}
	
	for (var i =0; i <= N; i++) {//右眼
			    var thetas = i * 2 * Math.PI / N;
			    var x = 0.2* Math.sin(thetas)+0.5;
			    var y = 0.2* Math.cos(thetas)+0.4;
			    vertices.push(x, y);
	}
	
	for (var i =0; i <= N; i++) {//左眼
			    var thetas = i * 2 * Math.PI / N;
			    var x = 0.2* Math.sin(thetas)-0.5;
			    var y = 0.2* Math.cos(thetas)+0.4;
			    vertices.push(x, y);
	}
	for (var i =0; i <= N; i++) {//眼珠
			    var thetas = i * 2 * Math.PI / N;
			    var x = 0.05* Math.sin(thetas)-0.5;
			    var y = 0.05* Math.cos(thetas)-0.4;
			    vertices.push(x, -1*y);
	}
	for (var i =0; i <= N; i++) {//眼珠
			    var thetas = i * 2 * Math.PI / N;
			    var x = 0.05* Math.sin(thetas)+0.5;
			    var y = 0.05* Math.cos(thetas)-0.4;
			    vertices.push(x, -1*y);
	}
	
	for (var i =0; i <= N; i++) {//鼻子
			    var thetas = i * 2 * Math.PI / N;
			    var x = 0.1* Math.sin(thetas);
			    var y = 0.1* Math.cos(thetas);
			    vertices.push(x, -1*y);
	}
	vertices.push(0, -0.75);
	vertices.push(-0.5, -0.5);
	vertices.push(0, -0.75);
	vertices.push(0.5, -0.5); 
	
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	thetaLoc = gl.getUniformLocation( program, "theta" );

	render();
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	
	// set uniform values
	theta += speed*0.1;
	if( theta > 2 * Math.PI )
		theta -= (2 * Math.PI);
	
	gl.uniform1f( thetaLoc, theta );

	gl.drawArrays( gl.LINE_STRIP, 0, (vertices.length-6)/12 );
	gl.drawArrays( gl.LINE_STRIP, N+1, (vertices.length-6)/12 );
	gl.drawArrays( gl.LINE_STRIP, 2*N+2, (vertices.length-6)/12 );
	gl.drawArrays( gl.LINE_STRIP, 3*N+3, (vertices.length-6)/12 );
	gl.drawArrays( gl.LINE_STRIP, 4*N+4, (vertices.length-6)/12 );
	gl.drawArrays( gl.LINE_STRIP, 5*N+5, (vertices.length-6)/12 );
	gl.drawArrays( gl.LINE_STRIP, 6*N+5, 5 );
	gl.drawArrays( gl.LINE_STRIP, 6*N+7, 2 );
	// update and render
	window.requestAnimFrame( render );
}