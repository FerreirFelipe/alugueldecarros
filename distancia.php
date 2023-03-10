<?php
    public class Distancia{
        public function construtor(){            

        }
    
        function recuperarDistancia(){

            $origem = $_POST ["origem"];
            $destino   = $_POST ["destino"];
            $modo_viagem= $_POST["modo_viagem"];

            $origem = urlencode($origem);
            $destino = urlencode($destino);

            $data = file_get_contents("https://maps.googleapis.com/maps/api/directions/json?origin=$origem&destination=$destino&key=AIzaSyCSLHjxL5qd_h_ONnB4VihiPn6hAKygZkE");
            $data = json_decode($data);

            var_dump($data);

            $tempo = 0;
            $distancia = 0;

            foreach($data->rows[0]->elements as $rota) {
                $tempo += $rota->duration->value;
                $distancia += $rota->distance->value;
            }

            echo "Destino: ".$data->destination_addresses[0];
            echo "<br/>";
            echo "Origem: ".$data->origin_addresses[0];
            echo "<br/>";
            echo "Tempo: ".$tempo." segundos";
            echo "<br/>";
            echo "Distance: ".$distance." metros";
        }
    }
?>