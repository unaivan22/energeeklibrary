<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$conn = new mysqli("localhost", "una", "unaivan", "ebrutalism");
if ($conn->connect_error) {
    die(json_encode(["error" => "Koneksi gagal: " . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["id"])) {
    $id = intval($_GET["id"]); // Hindari SQL Injection

    $sql = "SELECT * FROM projects WHERE id = $id LIMIT 1";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $project = $result->fetch_assoc();
        $project["screenshots"] = json_decode($project["screenshots"]); // Ubah JSON ke array
        echo json_encode($project);
    } else {
        echo json_encode(["error" => "Project tidak ditemukan"]);
    }
} else {
    echo json_encode(["error" => "ID tidak diberikan"]);
}

$conn->close();
?>
