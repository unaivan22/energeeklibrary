<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "eneg1777_ebrutalism_user", "energeekbrutalism", "eneg1777_ebrutalism");
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Koneksi gagal: " . $conn->connect_error]));
}

$id = isset($_GET["id"]) ? intval($_GET["id"]) : 0;
$sql = "SELECT * FROM blogs WHERE id = $id";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode(["success" => false, "error" => "Query gagal: " . $conn->error]);
    exit;
}

if ($result->num_rows > 0) {
    $blog = $result->fetch_assoc();
    echo json_encode(["success" => true, "blog" => $blog]);
} else {
    echo json_encode(["success" => false, "error" => "Blog tidak ditemukan"]);
}

$conn->close();
?>
