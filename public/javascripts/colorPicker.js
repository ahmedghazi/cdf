var colorPicker = function(elem){
	var _this = this,
		canvas,context,imageObj,
		currentColor;

	this.init = function(){
		_this.render();
		_this.bindEvents();
	};

	this.render = function(){
		var html = '<div class="colorPicker">';
			html += '<canvas id="cp" width="200" height="200"></canvas>';
			html += '</div>';

		$("body").append(html);
		
		canvas = document.getElementById("cp");
		context = canvas.getContext("2d");

		imageObj = new Image();
		imageObj.onload = function() {
			context.drawImage(this,0,0,200,200);
		};
		imageObj.src = '../images/color-wheel.png';

	};

	this.bindEvents = function(){
		$("#color").on("click", function(event){
			event.preventDefault();
			$("body").removeClass("tool_delete")
			$(".colorPicker").toggle();
		});

		$("html").on("click", ".vignette", function(){
			if(currentColor != '')$(this).css({"background-color":currentColor})
		});

		canvas.addEventListener('mouseup', function(evt) {
			var mousePos = _this.getMousePos(evt);
          	_this.handleChange(mousePos)
        }, false);

		canvas.addEventListener('mousemove', function(evt) {
			//var mousePos = _this.getMousePos(evt);
          	//_this.handleChange(mousePos)
		}, false);
	};

	this.handleChange = function(mousePos){
		var color = undefined;
		var imageData = context.getImageData(0, 0, 200, 200);
        var data = imageData.data;
        var x = mousePos.x;
        var y = mousePos.y;
        var red = data[((imageObj.width * y) + x) * 4];
        var green = data[((imageObj.width * y) + x) * 4 + 1];
        var blue = data[((imageObj.width * y) + x) * 4 + 2];
        currentColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
        console.log(currentColor);
        $("#color").css({color:currentColor})
	};

	this.getMousePos = function(evt){
        var rect = canvas.getBoundingClientRect();
        return {
        	x: evt.clientX - rect.left,
          	y: evt.clientY - rect.top
        };
    }
}