<?php


    $from = $_POST "origem";
    $to   = $_POST "destino";

    $from = urlencode($from);
    $to = urlencode($to);

    $data = file_get_contents("https://maps.googleapis.com/maps/api/directions/json?origin=$from&destination=$to&key=AIzaSyCSLHjxL5qd_h_ONnB4VihiPn6hAKygZkE");
    $data = json_decode($data);

    $time = 0;
    $distance = 0;

    foreach($data->rows[0]->elements as $road) {
        $time += $road->duration->value;
        $distance += $road->distance->value;
    }

    echo "To: ".$data->destination_addresses[0];
    echo "<br/>";
    echo "From: ".$data->origin_addresses[0];
    echo "<br/>";
    echo "Time: ".$time." seconds";
    echo "<br/>";
    echo "Distance: ".$distance." meters";
?>