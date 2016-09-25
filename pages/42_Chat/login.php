<?php
include ('auth.php');
session_start();
if (isset($_POST['submit']))
{
if (auth($_POST['login'], $_POST['passwd']) == TRUE)
{
	$_SESSION['loggued_on_user'] = $_POST['login'];
?>
<aside style="background-color:#3399ff">
	<iframe scrolling="auto" iframe allowtransparency="true" name="chat" src="chat.php" width="100%"" style=" background-image:url(http://vertassets.blob.core.windows.net/image/3920a7d1/3920a7d1-2a07-4f4b-97be-a26177a2cdc2/apple_logo_silver.jpg);" height="550px" frameborder="1"></iframe>
	<iframe scrolling="auto" iframe allowtransparency="true" style="background-color:#000" name="speak" src="speak.php" width="100%" 
 height="50px" frameborder="1"></iframe>
</aside>
<?php
}
else
{
	$_SESSION['loggued_on_user'] = "";
	echo "ERROR\n";
}
}
?>
<html>
<head>
<style type="text/css">
body
{
background-image:url('https://d4z6dx8qrln4r.cloudfront.net/image-575f0b26525e7-default.png');
}
</style>
</head>
<body>
<form action="./logout.php" method="post">
	Logout : <input type="submit" name="logout" value="OK" />
</form>	
</body>
</html>
