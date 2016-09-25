<?php
#Time Set
date_default_timezone_set('Africa/Johannesburg');
echo '<meta http-equiv="refresh" content="20">';
#User Rights Checker
#Check
	if (file_exists("./private/chat") == TRUE)
	{
		$test = unserialize(file_get_contents("./private/chat"));
		foreach ($test as $value) 
		{
			echo "[";
			echo date("H:i", $value['time']);
			echo "] ";
			echo "<b>";
			echo $value['login'];
			echo "</b>: ";
			echo $value['msg'];
			echo "<br />";
		}
	}
?>