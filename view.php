<?php

require("db.local.php");
$connect = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, 'svin');
if (!$connect) {
    die('Вот дерьмо! Не работает!');
}

try {
    $count = mysqli_query($connect, "SELECT * FROM `svin`");
    $count = mysqli_fetch_row($count);

    echo $count[0];
} catch (Throwable $e) {
    header(http_response_code(500));
    echo 'Возникла ошибка на сервере. Попробуйте ещё раз!';
}