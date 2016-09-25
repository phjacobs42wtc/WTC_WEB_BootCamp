<?php
include ('./auth.php');
session_start();
if (isset($_POST['submit']))
{
if (auth($_POST['login'], $_POST['passwd']) == TRUE)
{
	$_SESSION['loggued_on_user'] = $_POST['login'];
	header("Location: ../../html/index.html");
?>
<?php
}
else
{
	$_SESSION['loggued_on_user'] = "";
	echo "ERROR\n";
}
}
?>