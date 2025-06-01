<?php

require("db.local.php");
$connect = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, 'svin');
if (!$connect) {
    die('Возникла ошибка на сервере. Попробуйте ещё раз!');
}

try {
    $count = mysqli_query($connect, "SELECT * FROM `svin`");
    $count = mysqli_fetch_row($count);
} catch (Throwable $e) {
    header(http_response_code(500));
    echo 'Возникла ошибка на сервере. Попробуйте ещё раз!';
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="shortcut icon" href="/res/svin.png" type="image/x-icon">
    <script src="/js/script.js"></script>
    <style>
        .svin {
            transform: translateX(0vw);
        }

        #number {
            transform: translateX(0vw);
        }

        .bottom {
            transform: translateY(0vw);
        }

        .title {
            transform: translateY(0vw);
        }
    </style>
    <title>Счётчик свиней!</title>
</head>
<body>
    <div class="wrapper">
        <div class="title">Всемирный Международный Счётчик Свиней</div>
        <div class="center">
            <div class="svin">
                <img src="/res/svin.png" alt="Свин" width="100%">
            </div>
            <div id="number"><?= $count[0]; ?></div>
        </div>
        <div class="bottom">
            <a href="/addL.php" class="button">Добавить свинью!</a>
        </div>
    </div>
</body>
</html>