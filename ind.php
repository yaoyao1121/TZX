<?php
$bo="bo111";
$jian="jian111";
$gao="gao111";
$cc="cc111";
$ff="water";
$null=0;
if($_SERVER["REQUEST_METHOD"]=="GET"){
	if($_GET["na"]=="bo"){
		echo $bo;
	}
	if($_GET["na"]=="jian"){
		echo $jian;
	}
	if($_GET["na"]=="gou"){
		echo $gao;
	}
	if($_GET["na"]=="cc"){
		echo $cc;
	}
}else{
	if($_POST["user"]=="xiaoyao"&&$_POST["password"]=="123456"){
		echo $_POST["user"];
	}else {
		echo $null;
	}
}
/*echo $_GET["name"].$_GET["sex"]*/
/*if($_SERVER["REQUEST_METHOD"]=="POST"){
	echo $_POST["name"];
	
}else{
	if($_GET["name"]=="bb"){
		echo $gou;
	}
	if($_GET["name"]=="cc"){
		echo $cc;
	}
	
}*/


?>