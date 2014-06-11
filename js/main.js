var controller;
$(document).ready(function(){
	controller = new ScrollMagic();
});

$(document).ready(function(){
	$('.screen').hide();
	$('body').delegate('#screen1','screen-init',function(){
		var screen = $("#screen1");
		screen.show();

		var screen_height = $(window).height()*2;

		screen.height(screen_height);

		$("#men").css({
			'position':'fixed',
			'width':$("#men").parent().width(),
			'height':$(window).height()*(3/4),
			'left':$("#men").parent().offset().left,
			'top':$("#men").parent().offset().top,
		});

		$("#men img").each(function(){
			$(this).data("original-width",$(this).width());
			$(this).data("original-width",$(this).height());
		});

		$("#men .thousand").css({"width":"100%"});

		$("#men .one-sixty").css({
			"width":$("#men .one-sixty").width()*($("#men .thousand").width()/$("#men .thousand").data("original-width")),
			"height":$("#men .one-sixty").height()*($("#men .thousand").height()/$("#men .thousand").data("original-height")),
		}).css({
			"left":($("#men .thousand").width()/2 - $("#men .one-sixty").width()/2),
			"opacity":0,
		});

		$("#men .one-sixty-red").css({
			"opacity":0,
			"width":"100%",
		});

		$("<div id='first-stick-point'></div>").appendTo(screen).css({
			'position':'absolute',
			'top':screen_height/4,
		});


		$(".section-second").css({
			'position':'absolute',
			'left':0,
			'top': screen_height/2,
		});

		$("<div id='second-stick-point'></div>").appendTo(screen).css({
			'position':'absolute',
			'top':screen_height/2,
		});

		screen.prepend('<div class="stuck"></div>');
		var sticky = $(".stuck",screen);
		sticky.width($(".section-first",screen).parent().width());
		sticky.css({
			'left': $(".section-first",screen).offset().left,
			'top': $(".section-first",screen).offset().top,
		});
		$(".section-first", screen).appendTo(sticky);

		$(".scroll",screen).click(function(event){
			event.preventDefault();
			$.scrollTo("#second-stick-point",1500);
		});

		/* ADD SCROLL MAGIC */

		var sticky_top = sticky.offset().top-$(window).scrollTop();

		var tween = new TweenMax.to("#men .thousand", 0.5, {
			width:$("#men .thousand").data("original-width"),
			left:-(($("#men .thousand").data("original-width")/2)-($("#men .thousand").width()/2)),
			top:-($("#men .thousand").data("original-height")-$("#men .thousand").height()),
			opacity:0,
		},0);
		tween2 = new TweenMax.to("#men .one-sixty", 0.5, {
			width:"100%",
			height:$("#men .one-sixty").data("original-height"),
			left:0,
			top:0,
			opacity:1,
		},0);
		tween3 = new TweenMax.from(".section-first em", 0.5, {
			color:"#000000",
		});

		var tl = new TimelineMax({
			"align":"start",
			"tweens":[tween, tween2, tween3],
		});

		var scene = new ScrollScene({
			triggerElement:"#first-stick-point",
			triggerHook: (sticky_top+sticky.height())/$(window).height(),
		})
		.setTween(tl)
		.addTo(controller);
		scene.on('start',function(event){

		});

		var tween_red = new TweenMax.from(".section-second em", 0.5, {
			color:"#000000",
		});
		var tween_160_orange = new TweenMax.to("#men .one-sixty",0.5,{
			opacity:0,
		});
		var tween_160_red = new TweenMax.to("#men .one-sixty-red",0.5,{
			opacity:1,
		});
		var tl2 = new TimelineMax({
			"align":"start",
			"tweens":[tween_red, tween_160_orange, tween_160_red],
		});

		var scene = new ScrollScene({
			triggerElement:"#second-stick-point",
			triggerHook: (sticky_top+sticky.height())/$(window).height(),
		}).setTween(tl2).addTo(controller);
		// SHOW/HIDE DOWN BUTTON
		scene.on('start',function(event){
			if(event.scrollDirection == 'FORWARD'){
				$("#screen1 .scroll").hide();
			}else{
				$("#screen1 .scroll").show();
			}

		});

		scene.on('start',function(event){
			if(event.scrollDirection == 'FORWARD'){
				$(".section-second", screen).appendTo(sticky);
				$(".section-second", screen).css("position","static");
			}
			if(event.scrollDirection == 'REVERSE'){
				$(".section-second", screen).appendTo(screen);
				$(".section-second", screen).css("position","absolute");				
			}
		});

		scene.on('start',function(event){
			if(event.scrollDirection == 'FORWARD'){
				$("#men").addClass("red");
			}
			if(event.scrollDirection == 'REVERSE'){
				$("#men").removeClass("red");
			}
		});

	});
	$('.screen:first').trigger('screen-init');
});
