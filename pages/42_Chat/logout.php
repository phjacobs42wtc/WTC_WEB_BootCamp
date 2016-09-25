<?php
 session_start();
$_SESSION['loggued_on_user'] = "";
echo 'Logged out successfully.';

HEADER("Refresh: 2; url=index.html");
?>