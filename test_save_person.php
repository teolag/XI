<?php

$response['person'] = $_POST;
$response['person']['personId'] = 3;
$response['message'] = "Saved";

header('Content-Type: application/json');
echo json_encode($response, JSON_NUMERIC_CHECK);






?>