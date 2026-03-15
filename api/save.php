<?php
header('Content-Type: application/json');

// Get the raw POST data
$jsonData = file_get_contents('php://input');

if ($jsonData) {
    // Write the JSON to data.json in the root directory
    $result = file_put_contents('../data.json', $jsonData);
    
    if ($result !== false) {
        echo json_encode(['status' => 'success', 'message' => 'Data saved successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Failed to write to data.json. Check file permissions.']);
    }
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'No data provided']);
}
?>
