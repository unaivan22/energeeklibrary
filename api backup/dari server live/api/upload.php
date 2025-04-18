<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$uploadDir = __DIR__ . "/uploads/";
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["file"])) {
    $fileExt = pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION);
    $fileName = "project-" . uniqid() . "." . $fileExt;
    $filePath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $filePath)) {
        $fileUrl = "/api/uploads/" . $fileName; // ✅ Tambahkan domain
        echo json_encode(["url" => $fileUrl]);
    } else {
        echo json_encode(["error" => "Gagal upload file"]);
    }
}
?>
