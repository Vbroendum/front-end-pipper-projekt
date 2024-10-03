<?php

    function add(int $a, int $b, int $c) {
        return $a + $b + $c;
    }

    //echo add(2,7,23);



    function vote (int $age, string $name, string $lastName) {
        if ($age >= 18) {
            return "$name $lastName is allowed to vote";
        } else {
            return "$name $lastName is not allowed to vote";
        }
    }

    echo vote(18, "Peter", "Parker");

    $numbers = array(2, 4, 6, 8, 10);
    array_push($numbers, 12);

function addNumbers(int $numbers) {
    $sum = 0;
    foreach ($numbers as $number) {
        $sum += $number;
    }
    return $sum;
}

echo addNumbers($numbers);


