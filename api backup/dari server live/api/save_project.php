<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "eneg1777_ebrutalism_user", "energeekbrutalism", "eneg1777_ebrutalism");
if ($conn->connect_error) {
    die(json_encode(["error" => "Koneksi gagal: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

$name = $conn->real_escape_string($data["name"]);
$desc = $conn->real_escape_string($data["description"]);
$year = $conn->real_escape_string($data["year"]);
$client = $conn->real_escape_string($data["client"]);
$thumbnail = $conn->real_escape_string($data["thumbnail"]);
$screenshots = json_encode($data["screenshots"]); // Simpan sebagai JSON

$sql = "INSERT INTO projects (name, description, year, client, thumbnail, screenshots) 
        VALUES ('$name', '$desc', '$year', '$client', '$thumbnail', '$screenshots')";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Gagal: " . $conn->error]);
}

$conn->close();
?>
