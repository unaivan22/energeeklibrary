<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$uploadedFiles = [];

foreach ($_FILES['screenshots']['tmp_name'] as $index => $tmpName) {
    $ext = pathinfo($_FILES['screenshots']['name'][$index], PATHINFO_EXTENSION);
    $newFileName = "screenshot-" . uniqid() . "." . $ext;
    $targetPath = "uploads/" . $newFileName;

    if (move_uploaded_file($tmpName, $targetPath)) {
        $uploadedFiles[] = $targetPath;
    }
}

echo json_encode(["success" => true, "urls" => $uploadedFiles]);
?>
