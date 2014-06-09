var controller;
$(document).ready(function(){
	controller = new ScrollMagic();
});

$(document).ready(function(){
	$('.screen').hide();
	$('body').delegate('#screen1','screen-init',function(){
		var screen = $("#screen1");
		screen.show();
		screen.height($('.men.thousand').height()+$("#men").height()+500);

		$("<div id='men-stick-point'></div>").appendTo(screen).css({
			'position':'absolute',
			'top':$('.men.thousand').height(),
		});

		$(".section-second").css({
			'position':'absolute',
			'left':0,
			'top': $('.men.thousand').height()+$("#men").height()/2,
		});

		$("<div id='second-section-stick-point'></div>").appendTo(screen).css({
			'position':'absolute',
			'top':$('.men.thousand').height()+$("#men").height()/2,
		});

		screen.prepend('<div class="stuck"></div>');
		var sticky = $(".stuck",screen);
		sticky.width($(".section-first",screen).parent().width());
		sticky.css({
			'left': $(".section-first",screen).offset().left,
			'top': $(".section-first",screen).offset().top,
		});
		$(".section-first", screen).appendTo(sticky);
		


		/* ADD SCROLL MAGIC */

		var sticky_top = sticky.offset().top-$(window).scrollTop();


		var scene = new ScrollScene({
			triggerElement:"#men-stick-point",
			triggerHook: sticky_top/$(window).height(),
		}).addTo(controller);
		
		// GET MEN STUCK IN RIGHT PLACE
		scene.on('start',function(event){
			if(event.scrollDirection == 'FORWARD'){
				$("#men").css("top",$("#men").offset().top-$(window).scrollTop());
				$("#men").css("left",$("#men").offset().left);
				$("#men").addClass("stuck").addClass("orange");
			}
			if(event.scrollDirection == 'REVERSE'){
				$("#men").removeClass("stuck").removeClass("orange");
			}
		});

		var scene = new ScrollScene({
			triggerElement:"#second-section-stick-point",
			triggerHook: (sticky_top+sticky.height())/$(window).height(),
		}).addTo(controller);
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
