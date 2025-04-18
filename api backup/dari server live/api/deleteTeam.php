<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$host = "localhost";
$user = "eneg1777_ebrutalism_user";
$pass = "energeekbrutalism";
$dbname = "eneg1777_ebrutalism";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "Koneksi database gagal: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);
$id = intval($data["id"]);

// Ambil foto sebelum dihapus
$sql = "SELECT photo FROM teams WHERE id = $id";
$result = $conn->query($sql);
$photoPath = "";
if ($row = $result->fetch_assoc()) {
    $photoPath = $row["photo"];
}

// Hapus dari database
$sqlDelete = "DELETE FROM teams WHERE id = $id";
if ($conn->query($sqlDelete) === TRUE) {
    // Hapus file foto jika ada
    if (!empty($photoPath)) {
        $filePath = __DIR__ . "/uploadteams/" . basename($photoPath);
        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }
    echo json_encode(["success" => true, "message" => "Team berhasil dihapus"]);
} else {
    echo json_encode(["error" => "Gagal menghapus team: " . $conn->error]);
}

$conn->close();
?>
