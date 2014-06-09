var controller;
$(document).ready(function(){
	controller = new ScrollMagic();
});
$(document).ready(function(){
	var thousand_men = $(".men.thousand");
	$("#turn-orange").css("margin-bottom",thousand_men.height());
	$(".screen").css("margin-bottom",$(window).height());
});

$(document).ready(function(){
	var scene = new ScrollScene({
		triggerElement:"#men",
		offset:$("#men").height()/2,
	}).setPin("#men").addTo(controller);
	scene.on('start',function(event){
		if(event.scrollDirection == 'FORWARD'){
			$("#men").css("left",$(".men.thousand").offset().left);
		}else{
			$("#men").css("left",0);
		}

	});
});
