class Point{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}

	draw(radius,color){
		var point = document.createElement("div");
		$(point).css({
			width: radius,
			height: radius,
			backgroundColor: color,
			position: "absolute",
			borderRadius: "50%",
			left: this.x,
			bottom: this.y,
			zIndex: "2"
		});

		$("#canvas").append(point);
		return this;
	}

	distance(B){
		return Math.sqrt( Math.pow(B.x-this.x, 2) + Math.pow(B.y-this.y, 2));
	}

}

var rect_number = 0;


class Segment{
	constructor(x1,y1,x2,y2){
		this.P1 = new Point(x1,y1);
		this.P2 = new Point(x2,y2);
		this.length = Math.sqrt( Math.pow(this.P2.x-this.P1.x, 2) + Math.pow(this.P2.y-this.P1.y, 2));
		this.angle = Math.atan2(this.P2.y - this.P1.y, this.P2.x - this.P1.x) * 180 / Math.PI;
		this.a = y1 - y2;
		this.b = x2 - x1;
		this.c = x1 * y2 - x2 * y1;
	}

	draw(stroke,color){
		var line = document.createElement("div");
		line.className = "line";
		$(line).css({
			width: this.length,
			height: stroke,
			backgroundColor: color,
			position: "absolute",
			borderRadius: "5px",
			left: this.P1.x,
			bottom: this.P1.y,
			transform: "rotate(" + (360 - this.angle) + "deg)",
			transformOrigin: "0% 0%",
			zIndex: "1"
		});

		$("#canvas").append(line);

		//this.P1.draw(stroke,"red");
		//this.P2.draw(stroke,"red")
		return this;
	}

	distance(x0, y0){
		return Math.abs(this.a * x0 + this.b * y0 +this.c)/Math.sqrt(Math.pow(this.a,2)+Math.pow(this.b,2));
	}

	projection(x0,y0){
	    var x1=this.P1.x, y1=this.P1.y, x2=this.P2.x, y2=this.P2.y, x3=x0, y3=y0;
	    var px = x2-x1, py = y2-y1, dAB = px*px + py*py;
	    var u = ((x3 - x1) * px + (y3 - y1) * py) / dAB;
	    var x = x1 + u * px, y = y1 + u * py;
	    var point = new Point(x,y);
	    return point;
	}

}

class Rectangle1{
	constructor(x0,y0,width,height){
	    this.x0 = x0;
	    this.y0 = y0;		
	    this.s1 = new Segment(x0, y0, x0, y0 + height);
		this.s2 = new Segment(x0, y0+height, x0+width, y0+height);
		this.s3 = new Segment(x0+width, y0, x0+width, y0+height);
		this.s4 = new Segment(x0, y0, x0+width, y0);
		this.width = width;
		this.height = height;
		this.nr = rect_number;
		this.div = null;
	}

	draw(color){


		var rectangle = document.createElement("div");
		rectangle.className = "rectangle rectangle" + rect_number;
		this.div = $(".rectangle"+rect_number);
		$(rectangle).css({
			width: this.width,
			height: this.height,
			backgroundColor: color,
			position: "absolute",
			left: this.x0,
			bottom: this.y0,
			zIndex: "1"
		});

		$("#canvas").append(rectangle);

		return this;
	}

}

class Rectangle2{
	constructor(x0,y0,width,height,angle){
	    this.x0 = x0;
	    this.y0 = y0;		
		this.width = width;
		this.height = height;

		var rectangle = document.createElement("div");
		rectangle.id = "test";
		$(rectangle).css({
			width: this.width,
			height: this.height,
			backgroundColor: "#4ed",
			position: "absolute",
			left: this.x0,
			bottom: this.y0,
			transform: "rotate(" + (360 - angle) + "deg)",
			transformOrigin: "0% 100%",
			zIndex: "1"
		});

		$("#canvas").append(rectangle);

		var A = new Point(x0,y0);
		var B = new Point(x0 + width, y0 + height);
		var diag_length = A.distance(B);
		this.s1 = new Segment(x0, y0, x0 + width*getCos(angle), y0 + width*getCos(90-angle));
		this.s1.draw(1,"red");
		this.s2 = new Segment(x0, y0, x0 - height*getSin(angle), y0 + height*getCos(angle));
		this.s2.draw(1,"red");
		this.s3 = new Segment(x0 + width*getCos(angle), y0 + width*getCos(90-angle), x0 + width*getCos(angle) - height*getSin(angle), y0 + width*getCos(90-angle) + height*getCos(angle));
		this.s3.draw(1,"red");
		this.s4 = new Segment(x0 - height*getSin(angle), y0 + height*getCos(angle), x0 + width*getCos(angle) - height*getSin(angle), y0 + width*getCos(90-angle) + height*getCos(angle));
		this.s4.draw(1,"red");

		// this.s3 = new Segment(x0+width, y0, x0+width, y0+height);
		// this.s4 = new Segment(x0, y0, x0+width, y0

	}

	draw(color){


		var rectangle = document.createElement("div");
		rectangle.className = "rectangle rectangle" + rect_number;
		this.div = $(".rectangle"+rect_number);
		$(rectangle).css({
			width: this.width,
			height: this.height,
			backgroundColor: color,
			position: "absolute",
			left: this.x0,
			bottom: this.y0,
			zIndex: "1"
		});

		$("#canvas").append(rectangle);

		return this;
	}

}


class Rectangle{
	constructor(x1,y1,x2,y2,angle){
		var a = getTan(angle);
		var b = -1;
		var c = -1 * a * x1 + y1;

	    var x_test = 2;
	    var y_test = a * x_test + c;
	    var sgm_test = new Segment(x1,y1,x_test,y_test);
	    var D = sgm_test.projection(x2,y2);
	    var A = new Point(x1,y1);
	    var B = new Point(x1-D.x+x2, y1+y2-D.y);

	    this.x1 = x1;
	    this.y1 = y1
	    this.x2 = x2;
	    this.y2 = y2;		
	    this.s1 = new Segment(x1, y1, B.x, B.y);
		this.s2 = new Segment(B.x, B.y, x2, y2);
		this.s3 = new Segment(x2, y2, D.x, D.y);
		this.s4 = new Segment(x1, y1, D.x, D.y);
		this.width = A.distance(D);
		this.height = A.distance(B);
		this.diag = new Segment(x1,y1,x2,y2);
		this.angle = angle;
	}

	draw(color){


		var rectangle = document.createElement("div");
		rectangle.className= "rectangle";


		if(this.diag.angle > this.angle)
		{
			
			$(rectangle).css({
				width: this.width-2,
				height: this.height-2,
				backgroundColor: color,
				position: "absolute",
				left: this.x1-1,
				bottom: this.y1-1,
				transform: "rotate(" + (360 - this.angle) + "deg)",
				transformOrigin: "0% 100%",
				zIndex: "1"
			});
		}
		else{
			$(rectangle).css({
				width: this.width-2,
				height: this.height-2,
				backgroundColor: color,
				position: "absolute",
				left: this.s1.P2.x+1,
				bottom: this.s1.P2.y+1,
				transform: "rotate(" + (360 - this.angle) + "deg)",
				transformOrigin: "0% 100%",
				zIndex: "1"
			});
		}

		$("#canvas").append(rectangle);

		// this.s1.draw(stroke,"blue");
		// this.s2.draw(stroke,"red");
		// this.s3.draw(stroke,"green");
		// this.s4.draw(stroke,"yellow");
		// this.diag.draw(stroke,"pink");

		return this;
	}
}

function getTan(deg) {
  var rad = deg * Math.PI/180;
  return Math.tan(rad);
}

function getSin(deg) {
  var rad = deg * Math.PI/180;
  return Math.sin(rad);
}

function getCos(deg) {
  var rad = deg * Math.PI/180;
  return Math.cos(rad);
}

