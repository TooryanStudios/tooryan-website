<?php
header('Content-Type: application/json');

// Directory where images will be uploaded
$uploadDir = '../uploads/';

// Create directory if it doesn't exist
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $file = $_FILES['image'];
    $fileName = basename($file['name']);
    
    // Clean filename (remove spaces and special chars)
    $fileName = preg_replace("/[^a-zA-Z0-9.-]/", "_", $fileName);
    $targetFilePath = $uploadDir . time() . '_' . $fileName; // Add timestamp to prevent overwriting
    
    // Check if it's an actual image
    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);
    $allowedTypes = array('jpg', 'png', 'jpeg', 'gif', 'webp', 'svg');
    
    if (in_array(strtolower($fileType), $allowedTypes)) {
        if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
            // Return the relative URL to the image
            $relativeUrl = './uploads/' . basename($targetFilePath);
            echo json_encode(['status' => 'success', 'url' => $relativeUrl]);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Failed to upload file. Check permissions.']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Only JPG, JPEG, PNG, GIF, WEBP, & SVG files are allowed.']);
    }
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'No file uploaded']);
}
?>
