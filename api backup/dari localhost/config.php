<?php
$host = "localhost";
$user = "una";
$pass = "unaivan";
$db = "ebrutalism";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
?>
