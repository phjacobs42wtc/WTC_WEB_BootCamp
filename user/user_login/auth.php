<?php
function auth($login, $pass)
	{
		if (file_exists('../private/passwd'))
		{
			$content = file_get_contents('../private/passwd');
			$array = unserialize($content);
			if ($login && $login != "" && $pass && $pass != "")
			{
				foreach ($array as $key => $value)
				{
					if ($value['login'] == $login)
					{
						$hash = hash('whirlpool', $pass);
						if ($hash == $value['passwd'])
							return true;
					}
				}
			}
		}
		return false;
	}
?>