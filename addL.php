<?php

require("db.local.php");
$connect = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, 'svin');
if (!$connect) {
    die('Вот дерьмо! Не работает!');
}

try {
    mysqli_query($connect, "UPDATE `svin` SET `kolvo` += 1;");
    
    $count = mysqli_query($connect, "SELECT * FROM `svin`");
    $countNow = mysqli_fetch_row($countNow);

    echo $countNow[0];
    header("Location: /noscript.php");
} catch (Throwable $e) {
    header(http_response_code(500));
    echo 'Возникла ошибка на сервере. Попробуйте ещё раз!';
}
