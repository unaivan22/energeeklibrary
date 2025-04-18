<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$conn = new mysqli("localhost", "una", "unaivan", "ebrutalism");
if ($conn->connect_error) {
    die(json_encode(["error" => "Koneksi gagal: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];
$name = $conn->real_escape_string($data["name"]);
$desc = $conn->real_escape_string($data["description"]);
$year = $conn->real_escape_string($data["year"]);
$client = $conn->real_escape_string($data["client"]);
$thumbnail = $data["thumbnail"];
$newScreenshots = $data["screenshots"];

// Ambil data lama
$query = $conn->query("SELECT thumbnail, screenshots FROM projects WHERE id = '$id'");
$oldData = $query->fetch_assoc();
$oldThumbnail = $oldData["thumbnail"];
$oldScreenshots = json_decode($oldData["screenshots"], true);

// Hapus file lama jika thumbnail diupdate
if ($thumbnail !== $oldThumbnail) {
    @unlink(str_replace("http://localhost/api/", "", $oldThumbnail));
}

// Hapus screenshot lama yang tidak ada di yang baru
foreach ($oldScreenshots as $oldShot) {
    if (!in_array($oldShot, $newScreenshots)) {
        @unlink(str_replace("http://localhost/api/", "", $oldShot));
    }
}

// Simpan perubahan
$screenshotsJson = json_encode($newScreenshots);
$sql = "UPDATE projects SET name='$name', description='$desc', year='$year', client='$client', thumbnail='$thumbnail', screenshots='$screenshotsJson' WHERE id='$id'";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Gagal update: " . $conn->error]);
}

$conn->close();
?>
