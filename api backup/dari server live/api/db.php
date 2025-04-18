<?php
$host = "localhost";
$user = "eneg1777_ebrutalism_user";
$pass = "energeekbrutalism";
$dbname = "eneg1777_ebrutalism";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
