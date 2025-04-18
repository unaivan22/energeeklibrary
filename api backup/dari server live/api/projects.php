<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "eneg1777_ebrutalism_user", "energeekbrutalism", "eneg1777_ebrutalism");
if ($conn->connect_error) {
    die(json_encode(["error" => "Koneksi gagal: " . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $nama = $conn->real_escape_string($data["name"]);
    $desc = $conn->real_escape_string($data["description"]);
    $year = $conn->real_escape_string($data["year"]);
    $client = $conn->real_escape_string($data["client"]);
    $thumbnail = $conn->real_escape_string($data["thumbnail"]);
    $screenshots = json_encode($data["screenshots"]); // Simpan sebagai JSON

    $sql = "INSERT INTO projects (name, description, year, client, thumbnail, screenshots) 
            VALUES ('$nama', '$desc', '$year', '$client', '$thumbnail', '$screenshots')";

    if ($conn->query($sql)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => "Gagal: " . $conn->error]);
    }
}

// ✅ Tambahkan GET untuk mengambil data project
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $sql = "SELECT * FROM projects ORDER BY id DESC";
    $result = $conn->query($sql);

    $projects = [];
    while ($row = $result->fetch_assoc()) {
        $row["screenshots"] = json_decode($row["screenshots"]); // Ubah JSON ke array
        $projects[] = $row;
    }
    if (!$projects) {
    echo json_encode([]);
    exit();
}
    echo json_encode($projects);
}

$conn->close();
?>

