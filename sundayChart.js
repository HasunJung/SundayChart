
/*
canvas_element : HTML5 캔버스 객체
height : 데이터의 최대수치  
line : row 라인 갯수(=단위)
*/
var SundayChart = function(canvas_element, height, line){
	this.canvas = canvas_element;
	this.context = this.canvas.getContext('2d');
	this.height = height;
	this.line = line;
	this.storage = new Array(60);
	
	this.setCanvas();
}

SundayChart.prototype.setCanvas = function(){
	var context = this.context;
	var canvas = this.canvas;
	var line = this.line;
	var height = this.height;
	
	var user_range = height / line; 
	
	var drawX = canvas.height - height;
	drawX = drawX / line;
	//alert((drawX+ user_range) + ", "+(this.canvas.height / 6));

	var x = 0;
	var y = user_range + drawX;

	for(var i=0; i<line; i++){
		context.beginPath();
		context.strokeStyle = '#4169e1';
		context.moveTo(canvas.width, y);
		context.lineTo(x ,y);

		context.stroke();
		y = y + (user_range + drawX);
	} 
	
	context.textAlign = "right";
	
	context.fillText(height, canvas.width, 10);
	context.fillText("0", canvas.width, canvas.height);
}

SundayChart.prototype.doDraw = function(field_value){
	var context = this.context;
	var canvas = this.canvas;
	var height = this.height;
	var temp = 0;

	// 데이터 체인지
	for(var i=0; i<this.storage.length-1; i++){
		this.storage[i] = this.storage[i+1];
	}
	this.storage[this.storage.length-1]=field_value;

	// 캔버스 지우기
	context.clearRect(0,0,canvas.width, canvas.height);
	this.setCanvas();
	
	context.strokeStyle = '#800000';
	//데이터 그리기
	var range = canvas.height / height;

	context.beginPath();
	for(var i=0; i<this.storage.length; i++){
		var x = (i+1)*10;
		var y = (height - this.storage[i]) * range;
		context.lineTo(x,y);
		context.stroke();
	} 
}