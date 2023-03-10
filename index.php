<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script> 
        <script defer src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCSLHjxL5qd_h_ONnB4VihiPn6hAKygZkE" type="text/javascript"></script>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        
        <link rel="stylesheet" type="text/css" href="./style.css" />
        
        <title>Adicionando o Mapa</title>
    </head>

    <body align="center">
        <!-- Título da página-->
        <h3>Aluguel de Carros</h3>

        <!-- Inicio do form-->
        <form action="distance.php" id="distancia_form" method="post">
            <!-- Campo de origem-->
            <div>
                <label>Insira a origem:  </label><br>
                <input class="form-control" id="partida" placeholder="Insira a origem"/>
                <input id="origem" name="origem" required="" type="hidden"/><br>
            </div><br>

            <!-- Campo de destino-->
            <div>
                <label>Insira seu destino: </label><br>
                <input  id="chegada" placeholder="Insira o destino"/>
                <input id="destino" name="destino" type="hidden"/>
            </div><br>

            <!-- Opções de carros-->
            <div>
                <label>Carro escolhido: </label><br>
                <select id="modo_viagem" name="modo_viagem">
                   <option value="DRIVING">Carro básico</option>
                   <option value="DRIVING">Carro intermediario</option>
                   <option value="DRIVING">Carro Luxo</option>
                </select>
            </div><br>
            
            <!-- Botão -->
            <input type="submit" value="Pequisar"/>

            <div>
                <span id="resultado">
                    <p id="em_milhas"></p>
                    <p id="em_kms"></p>
                    <p id="texto_duracao"></p>
                </span>
            </div>
            
        </form>

        <!--Elemento div para o Mapa -->
        <div id="mapa"></div>

        <script type="module" src="./mapa.js"></script>
           
    </body>
</html>
    