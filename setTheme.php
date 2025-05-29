<?php

$name = json_decode(file_get_contents("php://input"), true);
setcookie('theme', $name['name']);
