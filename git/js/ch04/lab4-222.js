"use strict";

var canvas;
var gl;
var vBuffer;
var cBuffer;
var vertices = [];
var vertices1 = [];
var vertices2 = [];
var vertices3 = [];
var color = [];
var color1 = [];
var color2 = [];
var color3 = [];
var colorAll = [
	1.0,0.0,0.0,1.0,
	0.0,1.0,0.0,1.0,
	0.0,0.0,1.0,1.0,
	1.0,1.0,0.0,1.0,
	1.0,0.0,1.0,1.0,
	0.0,1.0,1.0,1.0,
	0.0,0.0,0.0,0.0
]

var x = 1;
var r = 0.1;
var N=100;

var t = [0.0,0.0,0.0];
var tLoc;
var theta = [0.0,0.0,0.0];
var thetaLoc;
var s = [1.0,1.0,1.0];
var sLoc;
var dc = [0.0,0.0,0.0,];
var dcLoc;
var cs;
var cIndex;

window.onload = function init(){
	canvas = document.getElementById( "gl-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 0.5, 0.5, 0.5, 1.0 );
	
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	
	vBuffer = gl.createBuffer(); //position
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, 16*500, gl.STATIC_DRAW );
	
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	 cBuffer = gl.createBuffer(); // color
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, 16*500, gl.STATIC_DRAW );
	
	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	
	tLoc = gl.getUniformLocation(program,"d");//√
	thetaLoc = gl.getUniformLocation(program,"theta");
	sLoc = gl.getUniformLocation(program,"s");
	dcLoc = gl.getUniformLocation(program,"dc");
	
	document.getElementById("tuxing").onclick = function(event){
		switch(parseInt(event.target.value)){
			case 0:
					x=1;
					break;
			case 1:
					x=2;
					break;
			case 2:
					x=3;
					break;
			case 3:
					x=4;
					break;
		}
	}
	document.getElementById("yanse").onclick = function(event){
		cIndex = parseInt(event.target.value)*4;
	}
	canvas.addEventListener( "mousedown", function( event ){
		makeArray();
		console.log(vertices);
		var rect = canvas.getBoundingClientRect();
		var cx = event.clientX - rect.left;
		var cy = event.clientY - rect.top; // offset
		t = glMatrix.vec3.fromValues( 2 * cx / canvas.width - 1, 2 * ( canvas.height - cy ) / canvas.height - 1,0.0 );
		console.log(t);
		//gl.uniform3fv(tLoc,new Float32Array(t));
	} );
	render();

}
function makeArray(){
	if(x==1){
		var radius = 0.1;
		vertices=[radius * Math.cos(90 * Math.PI / 180.0), radius * Math.sin(90 * Math.PI / 180.0),  0,1.0,
		    radius * Math.cos(210 * Math.PI / 180.0), radius * Math.sin(210 * Math.PI / 180.0),  0,1.0,
		    radius * Math.cos(-30 * Math.PI / 180.0), radius * Math.sin(-30 * Math.PI / 180.0),  0,1.0
			];
		color = [
			colorAll[cIndex],colorAll[cIndex+1],colorAll[cIndex+2],colorAll[cIndex+3],
			colorAll[cIndex],colorAll[cIndex+1],colorAll[cIndex+2],colorAll[cIndex+3],
			colorAll[cIndex],colorAll[cIndex+1],colorAll[cIndex+2],colorAll[cIndex+3]
		];		
	}
	if(x==2){
		cs = document.getElementById("cs").value;
		N = cs;
		vertices2 = [];
		for (var i = 0; i <= N; i++) {
				    var thetas = i * 2 * Math.PI / N;
				    var a = r * Math.sin(thetas);
				    var b = r * Math.cos(thetas);
				    vertices2.push(a, b, 0.0, 1.0);
		}
		for (var i = 0; i <= N; i++) {
				color2.push(colorAll[cIndex],colorAll[cIndex+1],colorAll[cIndex+2],colorAll[cIndex+3]);   
		}	
	}
	if(x==3){
		vertices1 = [
			-0.1,-0.1,0.0,1.0,
			-0.1,0.0,0.0,1.0,
			0.0,-0.1,0.0,1.0,
			-0.1,0.0,0.0,1.0,
			0.0,-0.1,0.0,1.0,
			0.0,0.0,0.0,1.0
		];
		//console.log("过程");
		color1 = [
				colorAll[cIndex],colorAll[cIndex+1],colorAll[cIndex+2],colorAll[cIndex+3],
				colorAll[cIndex],colorAll[cIndex+1],colorAll[cIndex+2],colorAll[cIndex+3],
				colorAll[cIndex],colorAll[cIndex+1],colorAll[cIndex+2],colorAll[cIndex+3],
				colorAll[cIndex],colorAll[cIndex+1],colorAll[cIndex+2],colorAll[cIndex+3],
				colorAll[cIndex],colorAll[cIndex+1],colorAll[cIndex+2],colorAll[cIndex+3],
				colorAll[cIndex],colorAll[cIndex+1],colorAll[cIndex+2],colorAll[cIndex+3]
			];		
	}
	if(x==4){
		var points = [
		    glMatrix.vec4.fromValues(-0.1, -0.1, 0.1, 1.0),
		    glMatrix.vec4.fromValues(-0.1, 0.1, 0.1, 1.0),
		    glMatrix.vec4.fromValues(0.1, 0.1, 0.1, 1.0),
		    glMatrix.vec4.fromValues(0.1, -0.1, 0.1, 1.0),
		    glMatrix.vec4.fromValues(-0.1, -0.1, -0.1, 1.0),
		    glMatrix.vec4.fromValues(-0.1, 0.1, -0.1, 1.0),
		    glMatrix.vec4.fromValues(0.1, 0.1, -0.1, 1.0),
		    glMatrix.vec4.fromValues(0.1, -0.1, -0.1, 1.0),
		];
		
		var vertexColors = [
		    glMatrix.vec4.fromValues(0.0, 0.0, 0.0, 1.0),
		    glMatrix.vec4.fromValues(1.0, 0.0, 0.0, 1.0),
		    glMatrix.vec4.fromValues(1.0, 1.0, 0.0, 1.0),
		    glMatrix.vec4.fromValues(0.0, 1.0, 0.0, 1.0),
		    glMatrix.vec4.fromValues(0.0, 0.0, 1.0, 1.0),
		    glMatrix.vec4.fromValues(1.0, 0.0, 1.0, 1.0),
		    glMatrix.vec4.fromValues(0.0, 1.0, 1.0, 1.0),
		    glMatrix.vec4.fromValues(1.0, 1.0, 1.0, 1.0)
		];
		
		var faces = [
		    1, 0, 3, 1, 3, 2, //正
		    2, 3, 7, 2, 7, 6, //右
		    3, 0, 4, 3, 4, 7, //底
		    6, 5, 1, 6, 1, 2, //顶
		    4, 5, 6, 4, 6, 7, //背
		    5, 4, 0, 5, 0, 1  //左
		];
		
		for (var i = 0; i < faces.length; i++) {
		    vertices3.push(points[faces[i]][0], points[faces[i]][1], points[faces[i]][2],points[faces[i]][3]);
		
		    color3.push(vertexColors[Math.floor(i / 6)][0], vertexColors[Math.floor(i / 6)][1], vertexColors[Math.floor(i / 6)][2], vertexColors[Math.floor(i / 6)][3]);
		}
	} 
	
} 
function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	if(x==1){//三角形
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW );
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW );
		//s = [1.0,1.0,1.0];
		theta = [0.0,0.0,0.0];
		dc = [0.0,0.0,0.0,];
		//缩放
		s[0] += 0.1;
		s[1] += 0.1;
		s[2] += 0.1;
		if(s[0]>3){
			s[0] = 1.0;
			s[1] = 1.0;
			s[2] = 1.0;
		}
		gl.uniform3fv(sLoc,s);
		gl.uniform3fv(dcLoc, dc);
		gl.uniform3fv(thetaLoc, theta);
		
		gl.uniform3fv( tLoc, new Float32Array(t));
		gl.drawArrays( gl.TRIANGLES, 0, 3 );
	}else if(x==2){
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(vertices2), gl.STATIC_DRAW );
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(color2), gl.STATIC_DRAW );
		s = [1.0,1.0,1.0];
		theta = [0.0,0.0,0.0];
		//dc = [0.0,0.0,0.0,];
		
		dc[0] += 0.01;
		dc[1] += 0.01;
		if(dc[0]>1){
			dc[0] = 0.0;
			dc[1] = 0.0;
		}
		gl.uniform3fv(sLoc,s);
		gl.uniform3fv(dcLoc, dc);
		gl.uniform3fv(thetaLoc, theta);
		
		gl.uniform3fv(tLoc,new Float32Array(t));
		gl.drawArrays( gl.TRIANGLE_FAN, 0, (vertices2.length)/3 );
	} else if(x==3){//正方形
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(vertices1), gl.STATIC_DRAW );
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(color1), gl.STATIC_DRAW );
		s = [1.0,1.0,1.0];
		//theta = [0.0,0.0,0.0];
		dc = [0.0,0.0,0.0,];
		
		theta[2] += 0.1;
		
		gl.uniform3fv(sLoc,s);
		gl.uniform3fv(dcLoc, dc);
		gl.uniform3fv(thetaLoc, theta);
		gl.uniform3fv(tLoc,new Float32Array(t));
		gl.drawArrays( gl.TRIANGLES, 0, 6 );
	} else if(x==4){//圆
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(vertices3), gl.STATIC_DRAW );
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(color3), gl.STATIC_DRAW );
		s = [1.0,1.0,1.0];
		//theta = [0.0,0.0,0.0];
		dc = [0.0,0.0,0.0,];
		
		theta[0] += 0.1;
		
		gl.uniform3fv(sLoc,s);
		gl.uniform3fv(dcLoc, dc);
		gl.uniform3fv(thetaLoc, theta);
		
		gl.uniform3fv(tLoc,new Float32Array(t));
		gl.drawArrays(gl.TRIANGLES, 0, vertices3.length / 3);
	}

	window.requestAnimFrame( render );
}