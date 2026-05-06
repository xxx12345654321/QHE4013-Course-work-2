<?php
// config/database.example.php
// 这是一个模板文件，请复制为 database.php 并填写您的信息

$host = "localhost";                  // 数据库服务器，通常就是 localhost
$username = "your_username_here";     // 改成您的数据库用户名
$password = "your_password_here";     // 改成您的数据库密码
$database = "car_sales_db";           // 数据库名（根据您的 database_schema.sql）

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");
?>
