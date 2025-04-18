<?php
// Set headers for CORS
header("Access-Control-Allow-Origin: http://localhost:5173"); // Allow frontend origin
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
header("Access-Control-Allow-Credentials: true"); // Allow credentials

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

// $host = "localhost";
// $db_name = "careerenergeek";
// $username = "una";
// $password = "unaivan";

// $conn = new mysqli($host, $username, $password, $db_name);

// Check if the connection is successful
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Database connection failed."]);
    exit();
}

// Parse the incoming request
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

if ($method === 'POST') {
    // Validate the incoming data
    if (!isset($data['username'], $data['email'], $data['password'], $data['role'])) {
        http_response_code(400);
        echo json_encode(["message" => "Incomplete data."]);
        exit();
    }

    $username = $conn->real_escape_string($data['username']);
    $email = $conn->real_escape_string($data['email']);
    $password = password_hash($data['password'], PASSWORD_DEFAULT); // Hash the password
    $role = $conn->real_escape_string($data['role']);

    // Insert the new user into the database
    $stmt = $conn->prepare("INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $username, $email, $password, $role);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["message" => "User registered successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to register user."]);
    }

    $stmt->close();
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed."]);
}

$conn->close();
?>
