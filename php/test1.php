<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

$sTestFilesFolder = '../test_files_folder/';

if(!is_dir($sTestFilesFolder)){
	mkdir($sTestFilesFolder);
}

foreach ($_FILES as $i => $v) {
	$sName = $v['name'];
	$iIndex = 1;
	$bLoaded = false;

	if($sName !== ''){;
		do{
			$sRute = $sTestFilesFolder . $iIndex . "-" . $sName;

			if(!file_exists($sRute)){
				move_uploaded_file($v['tmp_name'], $sRute);
				$bLoaded = true;
			}

			$iIndex++;
		}while(!$bLoaded);
	}
}


$aResponse = [];
$aResponse['status'] = 1;

echo json_encode($aResponse);