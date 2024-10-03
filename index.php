<?php
// Databaseforbindelse
$servername = "localhost";
$username = "root"; // Skift dette, hvis du bruger andre credentials
$password = "root"; // Skift dette, hvis nødvendigt
$dbname = "pipperprojekt"; // Dit database navn
$port = 3306; // Port for MySQL Workbench

// Opret forbindelse
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Tjek forbindelsen
if ($conn->connect_error) {
    die("Forbindelse mislykkedes: " . $conn->connect_error);
}
?>
