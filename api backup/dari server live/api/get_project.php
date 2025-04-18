<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "eneg1777_ebrutalism_user", "energeekbrutalism", "eneg1777_ebrutalism");
if ($conn->connect_error) {
    die(json_encode(["error" => "Koneksi gagal: " . $conn->connect_error]));
}

$id = isset($_GET["id"]) ? intval($_GET["id"]) : 0;
$sql = "SELECT * FROM projects WHERE id = $id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $project = $result->fetch_assoc();
    echo json_encode(["success" => true, "project" => $project]);
} else {
    echo json_encode(["success" => false, "error" => "Project tidak ditemukan"]);
}

$conn->close();
?>
