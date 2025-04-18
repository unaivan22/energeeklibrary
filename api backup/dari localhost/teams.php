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
$user = "una"; // Sesuaikan dengan user database
$pass = "unaivan"; // Sesuaikan dengan password database
$db = "ebrutalism"; // Sesuaikan dengan nama database

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode(["error" => "Koneksi database gagal: " . $conn->connect_error]));
}

// Tangani request POST (menambahkan project)
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $name = $conn->real_escape_string($data["name"]);
    $role = $conn->real_escape_string($data["role"]);
    $email = $conn->real_escape_string($data["email"]);
    $photo = $conn->real_escape_string($data["photo"]);

    // Debug query sebelum dieksekusi
$sql = "INSERT INTO teams (name, role, email, photo) 
        VALUES ('$name', '$role', '$email', '$photo')";


    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Team berhasil ditambahkan"]);
    } else {
        echo json_encode(["error" => "Gagal menambahkan teams dari BE: " . $conn->error]);
    }
}

$conn->close();
?>
