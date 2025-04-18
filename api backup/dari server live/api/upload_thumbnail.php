<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "eneg1777_ebrutalism_user", "energeekbrutalism", "eneg1777_ebrutalism");
if ($conn->connect_error) {
    die(json_encode(["error" => "Koneksi gagal: " . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "error" => "Invalid request method"]);
    exit();
}

if (!isset($_FILES["file"]) || !isset($_POST["id"])) {
    echo json_encode(["success" => false, "error" => "File atau ID tidak ditemukan"]);
    exit();
}

$id = intval($_POST["id"]);
$file = $_FILES["file"];
$uploadDir = __DIR__ . "/uploads/";

// Ambil thumbnail lama dari database
$oldQuery = "SELECT thumbnail FROM projects WHERE id = ?";
$stmt = $conn->prepare($oldQuery);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$oldThumbnail = "";
if ($row = $result->fetch_assoc()) {
    $oldThumbnail = $row["thumbnail"];
}
$stmt->close();

// Hapus file thumbnail lama jika ada
if (!empty($oldThumbnail)) {
    $oldFilePath = __DIR__ . "/uploads/" . basename($oldThumbnail);
    if (file_exists($oldFilePath)) {
        unlink($oldFilePath); // Hapus file lama
    }
}

// Proses upload thumbnail baru
$fileExt = pathinfo($file["name"], PATHINFO_EXTENSION);
$newFileName = "project-" . uniqid() . "." . $fileExt;
$filePath = $uploadDir . $newFileName;

if (move_uploaded_file($file["tmp_name"], $filePath)) {
    $fileUrl = "/api/uploads/" . $newFileName;
    $updateQuery = "UPDATE projects SET thumbnail = ? WHERE id = ?";
    $stmt = $conn->prepare($updateQuery);
    $stmt->bind_param("si", $fileUrl, $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "fileUrl" => $fileUrl]);
    } else {
        echo json_encode(["success" => false, "error" => "Gagal memperbarui database"]);
    }
    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Gagal upload file"]);
}

$conn->close();
?>
