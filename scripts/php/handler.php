<?php

/*//form submission - enter data into DB
$urlhost = $_SERVER['SERVER_NAME'];
$local = 'localhost';

if (substr($urlhost, 0, strlen($urlhost)) === $local) {
    include 'connection-local.php';
} else {
    include '../../../../connection/recipe-connection.php';
}*/

$errors         = array(); //array for errors
$data           = array(); //array for data - JSON

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    //form values
    $movieid       = $_POST['movieid'];
    $movietitle    = $_POST['movietitle'];
    $overview      = $_POST['overview'];
    $posterpath    = $_POST['posterpath'];

    if ( !empty($movieid) ) {

        $data['success'] = true;
        $data['movietitle'] = $movietitle;

    } else {
        $data['success'] = false;
        $data['message'] = 'Did not work';
    }

}

echo json_encode($data);

?>