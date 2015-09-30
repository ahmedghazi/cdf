(function($){})(window.jQuery);

var ww,
	wh,
	nav,
	cdf,
	app;

$(document).ready(function (){
	
	format();
	//init_vendors();
	

});

$(window).load(function() {
	init_objects();
	init_vendors();
	$("#wrapper").removeClass('hidden');
});

$(window).resize(function() {
	format();
});

function init_vendors(){
	var cp = new colorPicker();
	cp.init();
}

function init_objects(){
	app = new App();
	app.init();
}

function format(){
	ww = $(window).width();
	wh = $(window).height();
	//$("#wrapper").width(ww-80)
	//$(".tunnel").width(ww);
}