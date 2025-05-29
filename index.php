<?php
$theme = $_COOKIE['theme'] ?? NULL;
if (is_null($theme) || $theme == 'default') {
    require(__DIR__ . '/themes/default/index.html');
} else {
    require(__DIR__ . '/themes/' . $theme . '/index.html');
}
