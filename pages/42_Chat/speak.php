<?php
/*
#error codes
$error	: "<PHP> ERROR CODE";
$fail	: "Failed Execute\n";
#Start Cookie
#check
if (session_start())
{
	echo $error."(0)" .$fail;
	return ;
}
#Check
if ($_SESSION['loggued_on_user'] != "")
{
	#Check
	if (isset($_POST['submit']))
	{
		#Check
		if ($_POST['submit'] == "SEND")
		{
			if (file_exists("../private/chat") == false)
			{
				$array	= array(array('time'=>time(), 'login'=>$_SESSION['loggued_on_user'], 'msg'=>$_POST['msg']));
				$serial	= serialize($array);
				#Check
				if(!file_put_contents("../private/chat", $serial))
				{
					echo "ERROR\n";
				}
				else
				{
					$fd = fopen("../private/chat", "c+");
					/*'c+'	Open the file for reading and writing; otherwise it has the same behavior as 'c'.*/
					/*
					flock($fd, LOCK_EX | LOCK_SH);
					/*
						LOCK_SH to acquire a shared lock (reader).
						LOCK_EX to acquire an exclusive lock (writer).
						LOCK_UN to release a lock (shared or exclusive).
					*/
						/*
					$arr	= file_get_contents("../private/chat");
					$test	= unserialize($arr);
					$test[]	= array('time'=>time(), 'login'=>$_SESSION['loggued_on_user'], 'msg'=>$_POST['msg']);
					$test2	= serialize($test);
					file_put_contents("../private/chat", $test2);
					flock($fd, LOCK_UN);
				}
			}
		}
	}
}
?>
<html>
	<script langage="javascript">top.frames['chat'].location = 'chat.php';</script>
	<head>
	</head>
	<body>
		<form action="" methode="post">
			<input type="text" name="msg" value="" />
			<input type="submit" name="submit" value="SEND"/>
		</form>
</body></html>
*/
	session_start();
	if ($_SESSION['loggued_on_user'] != "")
	{
		if (isset($_POST['submit']))
		{
			if ($_POST['submit'] == "SEND")
			{
				if (file_exists("./private/chat") == FALSE)
					{
						$array = array(array('time'=>time(), 'login'=>$_SESSION['loggued_on_user'], 'msg'=>$_POST['msg']));
						$seri = serialize($array);
						file_put_contents("./private/chat", $seri);
					}
				else
				{
					$fd = fopen("./private/chat", "c+");
					flock($fd, LOCK_EX | LOCK_SH);
					$array = file_get_contents("./private/chat");
					$test = unserialize($array);
					$test[] = array('time'=>time(), 'login'=>$_SESSION['loggued_on_user'], 'msg'=>$_POST['msg']);
					$te = serialize($test);
					file_put_contents("./private/chat", $te);
					flock($fd, LOCK_UN);


				}
			}
		}
?>
<html>
		<script langage="javascript">top.frames['chat'].location = 'chat.php';</script>
<head></head>
<body>

	<form method="POST" action="">  
		<input type="text" name="msg" value ="" />
		<input type="submit" name="submit" value="SEND">
	</form>

</body>
</html>

<?php
	}
?>
