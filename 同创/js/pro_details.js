$(function(){
	var $menu = $("#menu li");
	var $tab = $("#pic ul");
	 for(var i = 0 ;i< $menu.length;i++){
	 	$menu[i].index = i;
	 	//console.log($menu[i].index);
	 	$menu[i].onmouseover = function(e){
	 		for(var j = 0 ;j< $menu.length;j++){
	 			$menu[j].className = "";
	 		}
	 		$(this).attr("class","on");
	 		for(var k = 0 ;k< $menu.length;k++){
	 			$tab[k].className = "";
	 		}
	 		$tab[$(this)[0].index].className = "on";
	 		//console.log($(this)[0].index);
	 	}
	 }
})