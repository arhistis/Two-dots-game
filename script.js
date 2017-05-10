

$(document).ready(function(){

	var canvas = document.createElement("div");
	canvas.id = "canvas";

	$(canvas).css({
		width: "27em",
		height: "48em",
		backgroundColor: "#333",
		overflow: "hidden",
		position: "relative"
	});

	var dotL = document.createElement("div");
	dotL.id = "dotL";

	$(dotL).css({
		width: "2em",
		height: "2em",
		backgroundColor: "#d46",
		borderRadius: "50%",
		position: "absolute",
		left: "10em",
		right: "auto",
		top: "auto",
		bottom: "5em"
	});

	var dotR = document.createElement("div");
	dotR.id = "dotR";

	$(dotR).css({
		width: "2em",
		height: "2em",
		backgroundColor: "#66CCFF",
		borderRadius: "50%",
		position: "absolute",
		left: "auto",
		right: "10em",
		top: "auto",
		bottom: "5em"
	});

	$("body").append(canvas);
	$(canvas).append(dotL, dotR);

	canvas = $("#canvas");
	canvas_width = parseInt(canvas.css("width"));
	canvas_height = parseInt(canvas.css("height"));
	dotL = $("#dotL");
	dotR = $("#dotR");
	var dotR_rad = parseInt(dotR.css("width"))/2;
	var dotL_rad = parseInt(dotL.css("width"))/2;

	// var center = new Point(parseInt(dotR.css("left")) + dotR_rad/2, parseInt(dotR.css("bottom")) + dotR_rad/2);
	// center.draw(1,"black");

	var dotR_movements = {
		left: false,
		right: false,
		top: false,
		bottom: false
	};
	var dotL_movements = {
		left: false,
		right: false,
		top: false,
		bottom: false
	};

	var speed = 3;
	var game_speed = 5;
	var game_over = false;

	$(document).on('keydown', function(e){
		var key = e.keyCode;
		if(key == 37 && dotR_movements.left == false)
			dotR_movements.left = window.requestAnimationFrame(dotR_move_left);
		if(key == 39 && dotR_movements.right == false)
			dotR_movements.right = window.requestAnimationFrame(dotR_move_right);
		if(key == 38 && dotR_movements.top == false)
			dotR_movements.top = window.requestAnimationFrame(dotR_move_top);
		if(key == 40 && dotR_movements.bottom == false)
			dotR_movements.bottom = window.requestAnimationFrame(dotR_move_bottom);

		if(key == 65 && dotL_movements.left == false)
			dotL_movements.left = window.requestAnimationFrame(dotL_move_left);
		if(key == 68 && dotL_movements.right == false)
			dotL_movements.right = window.requestAnimationFrame(dotL_move_right);
		if(key == 87 && dotL_movements.top == false)
			dotL_movements.top = window.requestAnimationFrame(dotL_move_top);
		if(key == 83 && dotL_movements.bottom == false)
			dotL_movements.bottom = window.requestAnimationFrame(dotL_move_bottom);

		if(key == 13)
			for(var i=0;i<rectangles.length;i++){
				rectangles[i].s1.draw(2,"red");
				rectangles[i].s2.draw(2,"red");
				rectangles[i].s3.draw(2,"red");
				rectangles[i].s4.draw(2,"red");
			}
			
	});

	$(document).on('keyup', function(e){
		var key = e.keyCode;
		if(key == 37){
			window.cancelAnimationFrame(dotR_movements.left);
			dotR_movements.left = false;
		}
		else if(key == 39){
			window.cancelAnimationFrame(dotR_movements.right);
			dotR_movements.right = false;
		}
		else if(key == 38){
			window.cancelAnimationFrame(dotR_movements.top);
			dotR_movements.top = false;
		}
		else if(key == 40){
			window.cancelAnimationFrame(dotR_movements.bottom);
			dotR_movements.bottom = false;
		}

		else if(key == 65){
			window.cancelAnimationFrame(dotL_movements.left);
			dotL_movements.left = false;
		}
		else if(key == 68){
			window.cancelAnimationFrame(dotL_movements.right);
			dotL_movements.right = false;
		}
		else if(key == 87){
			window.cancelAnimationFrame(dotL_movements.top);
			dotL_movements.top = false;
		}
		else if(key == 83){
			window.cancelAnimationFrame(dotL_movements.bottom);
			dotL_movements.bottom = false;
		}
	});

	function dotR_move_left(){
		if(collision_dotR()==false){
			dotR.css("left", parseInt(dotR.css("left"))-speed);
			if(dotR_movements.left && collision_dotR()==false)
				window.requestAnimationFrame(dotR_move_left);
		}
	}
	function dotR_move_right(){
		if(collision_dotR()==false){
			dotR.css("left", parseInt(dotR.css("left"))+speed);
			if(dotR_movements.right && collision_dotR()==false)
				window.requestAnimationFrame(dotR_move_right);
		}
	}

	function dotR_move_top(){
		if(game_over==false){
			dotR.css("bottom", parseInt(dotR.css("bottom"))+speed);

			if(dotR_movements.top)
				dotR_movements.top = window.requestAnimationFrame(dotR_move_top);
		}
		else{
			dotR.css("bottom", parseInt(dotR.css("bottom"))-speed);
			window.cancelAnimationFrame(dotR_movements.top);
			dotR_movements.top = false;
		}
	}
	function dotR_move_bottom(){
		if(collision_dotR()==false){
			dotR.css("bottom", parseInt(dotR.css("bottom"))-speed);
			if(dotR_movements.bottom && collision_dotR()==false)
				window.requestAnimationFrame(dotR_move_bottom);
		}
		else{
			dotR.css("bottom", parseInt(dotR.css("bottom"))+speed);
			window.cancelAnimationFrame(dotR_movements.bottom);
			dotR_movements.bottom = false;
		}
	}

	function dotL_move_left(){
		if(parseInt(dotL.css("left")) > 0){
			dotL.css("left", parseInt(dotL.css("left"))-speed);
			if(dotL_movements.left)
				window.requestAnimationFrame(dotL_move_left);
		}
	}
	function dotL_move_right(){
		if(parseInt(dotL.css("left")) < parseInt(canvas.css("width"))-parseInt(dotL.css("width"))){
			dotL.css("left", parseInt(dotL.css("left"))+speed);
			if(dotL_movements.right)
				window.requestAnimationFrame(dotL_move_right);
		}
	}
	function dotL_move_top(){
		if(parseInt(dotL.css("bottom")) < parseInt(canvas.css("height"))-parseInt(dotL.css("height"))){
			dotL.css("bottom", parseInt(dotL.css("bottom"))+speed);
			if(dotL_movements.top)
				window.requestAnimationFrame(dotL_move_top);
		}
	}
	function dotL_move_bottom(){
		if(parseInt(dotL.css("bottom")) > 0){
			dotL.css("bottom", parseInt(dotL.css("bottom"))-speed);
			if(dotL_movements.bottom)
				window.requestAnimationFrame(dotL_move_bottom);
		}
	}

	// var s1 = new Segment(100,300,300,350);
	// s1.draw(2,"green");

	var rect1 = new Rectangle(100,150,200,250,90);
	// rect1.draw(3,"pink");

	var rect2 = new Rectangle(200,150,300,250,50);
	// rect2.draw(3,"pink");

	var rect3 = new Rectangle(300,150,400,250,40);
	// rect3.draw(3,"green");

	var rect4 = new Rectangle(50,50,150,100,30);
	// rect4.draw(0,"red");

	var rect5 = new Rectangle1(150,300,canvas_width-300,20);
	var rect6 = new Rectangle1(0,300,100,20);
	var rect7 = new Rectangle1(canvas_width-100,300,100,20);

	// var rectangles = [];
	var rectangles = [rect6,rect7];


	var rect_test = new Rectangle2(150,300,200,100,30);

	for(var i=0;i<rectangles.length;i++)
		rectangles[i].draw("#37d");

	frame = window.requestAnimationFrame(update);

	function update(){
		if(game_over == false)
		{

			$(".rectangle").css("bottom", parseInt($(".rectangle").css("bottom"))-game_speed);
			for(var i=0;i<rectangles.length;i++)
				move_rect(rectangles[i]);

			game_over = collision_dotR();
			//console.log(game_over);

			

			frame = window.requestAnimationFrame(update);
		}
		else{
			window.cancelAnimationFrame(frame);
			frame = false;
			alert("game over");
		}
		
	}

	function move_rect(rect)
	{
		if(rect.s1.P2.y < 0 )
		{
			rect.y0 += canvas_height + 50;
			move_line_up(rect.s1);
			move_line_up(rect.s2);
			move_line_up(rect.s3);
			move_line_up(rect.s4);
			rect.div.css("bottom", rect.y0);
		}
		else{
			rect.y0 -= game_speed;
			move_line(rect.s1);
			move_line(rect.s2);
			move_line(rect.s3);
			move_line(rect.s4);
		}
		
	}

	function move_line_up(sgm)
	{
		sgm.P1.y+=canvas_height+50;
		sgm.P2.y+=canvas_height+50;
		sgm.a = sgm.P1.y - sgm.P2.y;
		sgm.b = sgm.P2.x - sgm.P1.x;
		sgm.c = sgm.P1.x * sgm.P2.y - sgm.P2.x * sgm.P1.y;
	}

	function move_line(sgm)
	{
		sgm.P1.y-=game_speed;
		sgm.P2.y-=game_speed;
		sgm.a = sgm.P1.y - sgm.P2.y;
		sgm.b = sgm.P2.x - sgm.P1.x;
		sgm.c = sgm.P1.x * sgm.P2.y - sgm.P2.x * sgm.P1.y;
	}

	function collision_dotR(){
		for(var i=0; i<rectangles.length; i++){
			if( collision_dotR_sgm(rectangles[i].s1)==true || 
				collision_dotR_sgm(rectangles[i].s2)==true || 
				collision_dotR_sgm(rectangles[i].s3)==true ||
				collision_dotR_sgm(rectangles[i].s4)==true)
				return true;
		}
		return false;
	}

	var dotR_center;
	var dist;
	var projection_point;
	var projection_length_P1;
	var projection_length_P2 ;
	var distance_to_P1 ;
	var distance_to_P2;

	function collision_dotR_sgm(sgm)
	{
		if(parseInt(dotR.css("bottom")) > parseInt(canvas.css("height"))-parseInt(dotR.css("height")))
			return true;
		if(parseInt(dotR.css("left")) < 0)
			return true;
		if(parseInt(dotR.css("left")) > parseInt(canvas.css("width"))-parseInt(dotR.css("width")))
			return true;
		if (parseInt(dotR.css("bottom")) < 0)
			return true;
		

		dotR_center = new Point(parseInt(dotR.css("left")) + dotR_rad, parseInt(dotR.css("bottom")) + dotR_rad);
		dist = sgm.distance(dotR_center.x, dotR_center.y);
		projection_point = projection(sgm,dotR_center.x, dotR_center.y);
		projection_length_P1 = sgm.P1.distance(projection_point);
		projection_length_P2 = sgm.P2.distance(projection_point);
		distance_to_P1 = sgm.P1.distance(dotR_center);
		distance_to_P2 = sgm.P2.distance(dotR_center);
		if(distance_to_P1 < dotR_rad || distance_to_P2 < dotR_rad)
			return true;
		if(projection_length_P1 < sgm.length && projection_length_P2 < sgm.length && dist < dotR_rad)
			return true;
		return false;
	}

	// proiectia unui punct pe un segment

	function projection(sgm,x0,y0){
	    var x1=sgm.P1.x, y1=sgm.P1.y, x2=sgm.P2.x, y2=sgm.P2.y, x3=x0, y3=y0;
	    var px = x2-x1, py = y2-y1, dAB = px*px + py*py;
	    var u = ((x3 - x1) * px + (y3 - y1) * py) / dAB;
	    var x = x1 + u * px, y = y1 + u * py;
	    var point = new Point(x,y);
	    return point;
	}

	

});







