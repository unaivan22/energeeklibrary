<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Pastikan metode request adalah POST
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["file"])) {
    $targetDir = "uploadteams/";

    // Generate nama file unik
    $randomNumber = rand(1000, 9999); // Angka acak 4 digit
    $fileExtension = pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION); // Ambil ekstensi file
    $newFileName = "team-member-" . $randomNumber . "." . $fileExtension; // Format nama baru
    $targetFilePath = $targetDir . $newFileName;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
        echo json_encode(["url" => "/api/uploadteams/" . $newFileName]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Gagal mengunggah file"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Metode tidak valid"]);
}
?>
