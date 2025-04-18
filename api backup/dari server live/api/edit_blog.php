<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$conn = new mysqli("localhost", "eneg1777_ebrutalism_user", "energeekbrutalism", "eneg1777_ebrutalism");
if ($conn->connect_error) {
    die(json_encode(["error" => "Koneksi gagal: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];
$name = $conn->real_escape_string($data["name"]);
$desc = $conn->real_escape_string($data["description"]);
$thumbnail = $data["thumbnail"];

// Ambil data lama
$query = $conn->query("SELECT thumbnail FROM blogs WHERE id = '$id'");
$oldData = $query->fetch_assoc();
$oldThumbnail = $oldData["thumbnail"];

// Hapus file lama jika thumbnail diupdate
if ($thumbnail !== $oldThumbnail) {
    @unlink(str_replace("/api/", "", $oldThumbnail));
}

// Simpan perubahan
$sql = "UPDATE blogs SET name='$name', description='$desc', thumbnail='$thumbnail' WHERE id='$id'";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Gagal update: " . $conn->error]);
}

$conn->close();
?>
