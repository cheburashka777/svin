<?php

require("db.local.php");
$connect = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, 'svin');
if (!$connect) {
    die('Вот дерьмо! Не работает!');
}

try {
    $count = mysqli_query($connect, "SELECT * FROM `themes`");
    $count = mysqli_fetch_all($count, MYSQLI_ASSOC);
    
    header('Content-Type: application/json');
    echo json_encode($count, JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    header(http_response_code(500));
    echo 'Возникла ошибка на сервере. Попробуйте ещё раз!';
}