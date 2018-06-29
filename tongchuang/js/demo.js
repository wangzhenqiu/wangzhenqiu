	// JavaScript Document
$(document).ready(function() {
	var Myvideo = document.getElementById("Myvideo");
	
	Myvideo.onclick = function(){
		$(".pop").show();		
		Myvideo.pause();
	}
	
	
	$(".pop img").click(function(){
		$(".pop").hide();
		if(navigator.userAgent.indexOf("MSIE 8") > -1){
			$("#obj").html('<object data="images/Compress.swf" width="390" height="260" style=" margin-top:5px; margin-left:10px;" type="application/x-shockwave-flash" onclick="pause()">'
			+'<param name="movie" value="images/Compress.swf"  />'
            +'<param name="quality" play="best" />'
            +'<param name="Menu" value="1" />'
            +'<param name="wmode" value="opaque" />'
        	+'</object >')
        	
		}else{
			Myvideo.play();	
		}
	})
	$("#obj").click(function(e){
		$(".pop").show();
		$("#obj").empty();
		
		if(e.preventDefault){
			e.preventDefault();
		}else{
			e.returnValue = false;
		}
	})
		

});