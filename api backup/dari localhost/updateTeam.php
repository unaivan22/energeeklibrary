<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Koneksi database
$host = "localhost";
$user = "una";
$pass = "unaivan";
$db = "ebrutalism";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode(["error" => "Koneksi database gagal: " . $conn->connect_error]));
}

// Periksa apakah ada file yang diunggah
if (isset($_POST["id"]) && isset($_FILES["file"])) {
    $id = intval($_POST["id"]);
    $name = $conn->real_escape_string($_POST["name"]);
    $role = $conn->real_escape_string($_POST["role"]);
    $email = $conn->real_escape_string($_POST["email"]);

    // Ambil foto lama dari database
    $sql = "SELECT photo FROM teams WHERE id = $id";
    $result = $conn->query($sql);
    $oldPhotoPath = "";
    
    if ($row = $result->fetch_assoc()) {
        $oldPhotoPath = $row["photo"];
    }

    // Proses upload foto baru
    $targetDir = "uploadteams/";
    $fileExt = pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION);
    $newFileName = "team-member-" . uniqid() . "." . $fileExt;
    $targetFilePath = $targetDir . $newFileName;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
        // Hapus foto lama jika ada
        if (!empty($oldPhotoPath)) {
            $oldFilePath = __DIR__ . "/uploadteams/" . basename($oldPhotoPath);
            if (file_exists($oldFilePath)) {
                unlink($oldFilePath);
            }
        }

        // Update database dengan foto baru
        $newPhotoUrl = "http://localhost/api/uploadteams/" . $newFileName;
        $sqlUpdate = "UPDATE teams SET name='$name', role='$role', email='$email', photo='$newPhotoUrl' WHERE id=$id";
        
        if ($conn->query($sqlUpdate) === TRUE) {
            echo json_encode(["success" => true, "message" => "Team berhasil diperbarui"]);
        } else {
            echo json_encode(["error" => "Gagal memperbarui team: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Gagal mengunggah foto baru"]);
    }
} else {
    echo json_encode(["error" => "Data tidak lengkap"]);
}

$conn->close();
?>
