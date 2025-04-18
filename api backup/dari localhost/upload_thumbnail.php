<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "una", "unaivan", "ebrutalism");
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

// Ambil data project lama
$query = "SELECT thumbnail FROM projects WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $project = $result->fetch_assoc();
    $oldThumbnail = $project["thumbnail"];

    // Hapus file lama
    if ($oldThumbnail) {
        $oldFile = str_replace("http://localhost/api/", "", $oldThumbnail);
        if (file_exists($oldFile)) {
            unlink($oldFile);
        }
    }
}

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Generate random filename
$randomString = bin2hex(random_bytes(4));
$fileExt = pathinfo($file["name"], PATHINFO_EXTENSION);
$newFileName = "project-" . $randomString . "." . $fileExt;
$filePath = $uploadDir . $newFileName;

if (move_uploaded_file($file["tmp_name"], $filePath)) {
    $fileUrl = "http://localhost/api/uploads/" . $newFileName;

    // Update URL baru ke database
    $updateQuery = "UPDATE projects SET thumbnail = ? WHERE id = ?";
    $stmt = $conn->prepare($updateQuery);
    $stmt->bind_param("si", $fileUrl, $id);
    $stmt->execute();

    echo json_encode(["success" => true, "fileUrl" => $fileUrl]);
} else {
    echo json_encode(["success" => false, "error" => "Gagal upload file"]);
}

$conn->close();
?>
