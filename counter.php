<?php
$countFile = 'count.txt';

$count = (int)file_get_contents($countFile);

$count++;

file_put_contents($countFile, $count);

header('Content-Type: application/json');
echo json_encode(['count' => $count]);
?>