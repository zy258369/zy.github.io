"use strict";

var canvas;
var gl;

var points = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var xsAxis = 0;
var ysAxis = 1;
var zsAxis = 2;
var xtAxis = 0;
var ytAxis = 1;
var ztAxis = 2;

var axis = 0;
var saxis = 0;
var taxis = 0;
var theta = [0, 0, 0];
var d = [0, 0, 0];
var s = [1.0,1.0, 1.0];
var thetaLoc;
var sLoc;
var dLoc;
var xs,ys,zs;
var triangle,circel,cube,square;
var x=0;

function drawTriangle(){
	x=0;
}
function drawCircel(){
	x=1;
}
function drawSquare(){
	x=2;
}
function drawCube(){
	x=3;
}

canvas.addEventListener( "mousedown", function(event){
		var x = 2*event.clientX/canvas.width-1;
		var y = 2*(canvas.height-event.clientY)/canvas.height-1;
		d=[x,y,0.0];
	});

function initCube() {
    canvas = document.getElementById("rtcb-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	common();
}

function common(){
	// load shaders and initialize attribute buffer
    var program = initShaders(gl, "rtvshader", "rtfshader");
    gl.useProgram(program);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
}
function square(){
	makeCube();
	common();
	thetaLoc = gl.getUniformLocation(program, "theta");
	gl.uniform3fv(thetaLoc, theta);
	dLoc = gl.getUniformLocation(program, "d");
	gl.uniform3fv(dLoc, d);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	theta[0] += 0.1;
	gl.uniform3fv(thetaLoc, theta);
    render();
}
function triangle(){
	makeCube();
	dLoc = gl.getUniformLocation(program, "d");
	gl.uniform3fv(dLoc, d);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	render();
}
    

/*   function x_suofang() {
		xs = document.getElementById("xs").value;
        axis = xsAxis;
		s[axis] = xs;
		gl.uniform3fv(sLoc, s);
    }

	function y_suofang() {
		ys = document.getElementById("ys").value;
	    axis = ysAxis;
		s[axis] = ys;
		gl.uniform3fv(sLoc, s);
	}
	
	function z_suofang() {
		zs = document.getElementById("zs").value;
	    axis = zsAxis;
		s[axis] = zs;
		gl.uniform3fv(sLoc, s);
	} */

function makeCube() {
	if(x==0){
		var radius = 0.2;
		var vertices = [
		    radius * Math.cos(90 * Math.PI / 180.0), radius * Math.sin(90 * Math.PI / 180.0),  0,0,
		    radius * Math.cos(210 * Math.PI / 180.0), radius * Math.sin(210 * Math.PI / 180.0),  0,0,
		    radius * Math.cos(-30 * Math.PI / 180.0), radius * Math.sin(-30 * Math.PI / 180.0),  0,0
		];
		var u = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
		var v = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
		var w = vec3.fromValues( vertices[6], vertices[7], vertices[8] );
		vertices = [u,v,w];
		var vertexColors = [
		    glMatrix.vec4.fromValues(1.0, 0.0, 0.0, 1.0),
		    glMatrix.vec4.fromValues(1.0, 0.0, 0.0, 1.0),
		    glMatrix.vec4.fromValues(1.0, 0.0, 0.0, 1.0),
		];
		for (var i = 0; i <vertices.length ; i++) {
		    points.push(vertices[i][0], vertices[i][1], vertices[i][2]);
		}
		for (var i = 0; i <vertex.length ; i++){
			colors.push(vertexColors[i][0],
						vertexColors[i][1], 
						vertexColors[i][2], 
						vertexColors[i][3]);
		} 
		
	}
	if(x==3){
		var vertices = [
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
		    points.push(vertices[faces[i]][0], vertices[faces[i]][1], vertices[faces[i]][2]);
		
		    colors.push(vertexColors[Math.floor(i / 6)][0], vertexColors[Math.floor(i / 6)][1], vertexColors[Math.floor(i / 6)][2], vertexColors[Math.floor(i / 6)][3]);
		}
	}
    
}

function render(x,y) {
	if(x==2) square();
    gl.drawArrays(gl.TRIANGLES, 0, points.length / 3);

    requestAnimFrame(render);
}

