var controller;
$(document).ready(function(){
	controller = new ScrollMagic();
});
$(document).ready(function(){
	var scene = new ScrollScene({
		triggerElement:"#screen1",
	}).setPin("#men").addTo(controller);

	var scene = new ScrollScene({
		triggerElement:"#turn-orange",
	}).addTo(controller);
	scene.on('start',function(event){
		if(event.scrollDirection == 'FORWARD'){
			$("#men").addClass('orange');
		}else{
			$("#men").removeClass('orange');
		}
	});
});
