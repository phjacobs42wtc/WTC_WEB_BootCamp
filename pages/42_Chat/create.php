<?php
if ($_POST['login'] != "" && $_POST['passwd'] != "")
{
	if ($_POST['submit'] == "OK")
	{
		$pwd = hash('whirlpool', $_POST['passwd']);
		if (file_exists("./private") == FALSE)
		{
			mkdir("./private", 0777, true);
		}
		if (file_exists("./private/passwd") == FALSE)
		{
			$array = array(array('login'=>$_POST['login'], 'passwd'=>$pwd));
			$seri = serialize($array);
			file_put_contents("./private/passwd", $seri);
			echo "OK\n";
			header("Location: index.html");
		}
		else{
		$exist = FALSE;
		$array = file_get_contents("./private/passwd");
		$test = unserialize($array);
		foreach ($test as $elem) {
			if ($elem['login'] == $_POST['login'])
			{
				$exist = TRUE;
			}
		}
		if ($exist == FALSE)
		{
			$test[] = array('login'=>$_POST['login'], 'passwd'=>$pwd);
			$te = serialize($test);
			file_put_contents("./private/passwd", $te);
			echo "OK\n";
			header("Location: index.html");
		}
		else{
		echo "ERROR\n";
		}
		}
	}
	else
	{
		echo "ERROR\n";
	}
}
else
{
	echo "ERROR\n";
}
?>