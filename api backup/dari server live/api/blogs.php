<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// Koneksi ke database
$host = "localhost";
$user = "eneg1777_ebrutalism_user"; // Sesuaikan dengan user database
$pass = "energeekbrutalism"; // Sesuaikan dengan password database
$dbname = "eneg1777_ebrutalism"; // Sesuaikan dengan nama database

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "Koneksi database gagal: " . $conn->connect_error]));
}

// Tangani request POST (menambahkan blog)
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $name = $conn->real_escape_string($data["name"]);
    $thumbnail = $conn->real_escape_string($data["thumbnail"]);
    $description = $conn->real_escape_string($data["description"]);
    $created_at = date("Y-m-d H:i:s"); // Tambahkan timestamp saat ini

    $sql = "INSERT INTO blogs (name, thumbnail, description, created_at) 
            VALUES ('$name', '$thumbnail', '$description', '$created_at')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Blog berhasil ditambahkan"]);
    } else {
        echo json_encode(["error" => "Gagal menambahkan blog: " . $conn->error]);
    }
}


$conn->close();
?>
