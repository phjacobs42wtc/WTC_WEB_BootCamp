<?php
$array = array();
$i = 0;

if ($_POST["login"] != "" && $_POST["newpw"] != "" && $_POST["oldpw"])
{
	$array[$i] = array('login' => $_POST['login'], 'passwd' => hash('whirlpool', $_POST['newpw']));
	$data = file_get_contents('../private/passwd');
	$loaded = unserialize($data);
	$hash = hash('whirlpool', $_POST['oldpw']);
	foreach ($loaded as $key => $value)
	{
		if ($value['login'] == $_POST['login'] && $value["passwd"] == $hash)
		{
			$loaded[$i] = $array[0];
			file_put_contents('../private/passwd', serialize($loaded));
			echo "OK\n";
			exit();
		}
		$i++;
	}
}
echo "ERROR\n";
?>