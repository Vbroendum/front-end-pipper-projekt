<?php

require "../.env";

header("Access-Control-Allow-Origin: *");

header("Content-Type: application/json; charset=UTF-8");

header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");

header("Access-Control-Max-Age: 3600");

header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$REQUESTMethod = $_SERVER["REQUEST_METHOD"];
//echo $REQUESTMethod;

$password = getenv("PASSWORD");
$servername = "localhost:3306";
$username = "root";

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode(  '/', $uri);
$conn = new PDO("mysql:host=$servername;dbname=pipperprojekt", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


if ($REQUESTMethod == "GET" && $uri[1] == "pips") {

    

try {
    
        //set the PDO error mode to exception
    
    $statement = $conn->query("SELECT * FROM pips");
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);


} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}}

else if ($REQUESTMethod == "POST") {
    echo "You sent a post";
}


if ($REQUESTMethod == "POST" && $uri[1] == "pips") {
    $input = (array) json_decode(file_get_contents('php://input'), TRUE);

    //echo $input['name'];
    if (isset($input['username']) && $input['username'] != "") {
        if (isset($input['post']) && $input['post'] != "") {
    $data = [
        'username' => $input['username'],
        'post' => $input['post']
    ];


    
    $sql = 'INSERT INTO pips VALUES (default, :username, :post)';
    $statement = $conn->prepare($sql);
    $statement->execute($data);

    $id = $conn->lastInsertId();
    $pips = (object) $input;
    $pips->id = $id;
    echo json_encode($pips);


    } else {
        echo json_encode(["error" => "Missing username"]);
} 
    } else {
        echo json_encode(["error" => "Missing post"]);
    } 

}


?>