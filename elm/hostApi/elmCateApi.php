<?php
    //菜单分类获取
    header("Content-type: text/html; charset=utf-8");   
	include './fun.php';
    
    $url = "https://h5.ele.me/restapi/shopping/v2/restaurant/category?latitude=28.176229&longitude=112.988638";
    echo httpCurl($url);
?>