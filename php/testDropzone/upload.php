<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

$ds = DIRECTORY_SEPARATOR;
$storeFolder = '../../test_files_folder';

if(!file_exists($storeFolder)){
    mkdir($storeFolder);
}

if (!empty($_FILES)){
    $tempFile = $_FILES['file']['tmp_name'];

    $targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;

    $targetFile =  $targetPath . $_FILES['file']['name'];

    move_uploaded_file($tempFile, $targetFile);
}

$aResponse = [
    "status" => 1
];

echo json_encode((object)$aResponse);