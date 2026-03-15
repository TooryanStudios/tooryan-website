<?php
header('Content-Type: application/json');

$uploadDir = '../uploads/';
$images = [];

if (file_exists($uploadDir)) {
    $files = scandir($uploadDir);
    $allowedTypes = array('jpg', 'png', 'jpeg', 'gif', 'webp', 'svg');

    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            $fileType = pathinfo($file, PATHINFO_EXTENSION);
            if (in_array(strtolower($fileType), $allowedTypes)) {
                $images[] = './uploads/' . $file;
            }
        }
    }
}

// Sort by newest first based on file modified time if needed, but simple array reverse works for timestamped prefixes
rsort($images);

echo json_encode(['status' => 'success', 'images' => $images]);
?>
