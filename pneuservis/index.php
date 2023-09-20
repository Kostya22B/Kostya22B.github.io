<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Головна сторінка</title>
</head>
<body>
    <?php
    session_start();

    // Перевірка, чи користувач авторизований
    if (isset($_SESSION['user_id'])) {
        // Якщо користувач авторизований
        $user_id = $_SESSION['user_id'];
        $username = $_SESSION['username'];
        echo "<h1>Ласкаво просимо, $username!</h1>";
        echo "<p><a href='logout.php'>Вийти</a></p>";
    } else {
        // Якщо користувач не авторизований
        echo "<h1>Ласкаво просимо на нашу головну сторінку!</h1>";
        echo "<p><a href='login.php'>Увійти</a></p>";
        echo "<p><a href='register.php'>Зареєструватися</a></p>";
    }
    ?>
<p>hui</p>
</body>
</html>
