<?php
$host = "localhost";
$user = "una";
$pass = "unaivan";
$dbname = "ebrutalism";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
