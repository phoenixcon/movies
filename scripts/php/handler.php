<?php

$errors         = array(); //array for errors
$data           = array(); //array for data - JSON

if (substr($urlhost, 0, strlen($urlhost)) === $local) {
    include 'apiconfig.php';
} else {
    include '../../../../connection/apiconfig.php';
}



if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $searchvalue    = $_POST['searchvalue'];

    $data['searchvalue'] = $searchvalue;

    // Get cURL resource
    $curl = curl_init();
    // Set some options - we are passing in a useragent too here
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => 'https://api.themoviedb.org/3/search/movie?language=en-US&include_adult=false&api_key='.$apikey.'&query='.$searchvalue,
        //CURLOPT_USERAGENT => 'Codular Sample cURL Request'
        ));
    // Send the request & save response to $resp
    $result = curl_exec($curl);
    // Close request to clear up some resources
    curl_close($curl);
    
    $data['results'] = json_decode($result, true);








    /*    //form values
    $movieid       = $_POST['movieid'];
    $movietitle    = $_POST['movietitle'];
    $overview      = $_POST['overview'];
    $posterpath    = $_POST['posterpath'];

    //form submission - enter data into DB
    $urlhost = $_SERVER['SERVER_NAME'];
    $local = 'localhost';

    if (substr($urlhost, 0, strlen($urlhost)) === $local) {
        include 'connection-local.php';
    } else {
        include '../../../../connection/movie-connection.php';
    }

    $check_rank_query = "SELECT MAX(rank) AS HighestRank FROM coming_soon";
    $check_rank_result = mysqli_query($db, $check_rank_query);
    $check_rank_row = mysqli_fetch_assoc($check_rank_result);
    $movierank = $check_rank_row['HighestRank']+1;

    $add_movie_query = "INSERT INTO coming_soon(id, name, rank, posterurl, overview) VALUES(null, '$movietitle', '$movierank', '$posterpath', '$overview')";

    mysqli_query($db, $add_movie_query);

    $data['success'] = true;
    $data['movietitle'] = $movietitle;
    $data['query'] = $add_movie_query;
    $data['rank'] = $movierank;

} else {

    $errors['submit'] = 'Something went wrong.';
    $data['success']  = false;
    $data['errors']   = $errors;
*/
};

echo json_encode($data);

?>