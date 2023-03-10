$(function () {
    var origem, destination, map;

    // adicionando campos de entrada
    google.maps.event.addDomListener(window, 'load', function (listener) {
        definindoDestinos();
        iniciarMapa();
    });

    // Iniciando o mapa
    function iniciarMapa() {
        var minhaLatLng = {
            lat: 20.5937,
            lng: 78.9629
        };
        map = new google.maps.Map(document.getElementById('mapa'), {zoom: 16, center: minhaLatLng,});
    }

    function definindoDestinos() {
        var partida = new google.maps.places.Autocomplete(document.getElementById('partida'));
        var chegada = new google.maps.places.Autocomplete(document.getElementById('chegada'));

        google.maps.event.addListener(partida, 'place_changed', function () {
            var partida_endereco = partida.getPlace();
            var endereco_partida = partida_endereco.formatted_address;
            $('#origem').val(endereco_partida);
        });

        google.maps.event.addListener(chegada, 'place_changed', function () {
            var chegada_endereco = chegada.getPlace();
            var endereco_chegada = chegada_endereco.formatted_address;
            $('#destino').val(endereco_chegada);
        });
    }

    function exibirRota(modo_viagem, origem, destino, servicos_direcoes, exibir_direcoes) {
        servicos_direcoes.route({
            origin: origem,
            destination: destino,
            travelMode: modo_viagem,
            avoidTolls: true
        }, function (response, status) {
            if (status === 'OK') {
                exibir_direcoes.setMap(map);
                exibir_direcoes.setDirections(response);
            } else {
                exibir_direcoes.setMap(null);
                exibir_direcoes.setDirections(null);
                alert('Não foi possível exibir as rotas devido a: ' + status);
            }
        });
    }

    // calcule a distância, depois de terminar, envie o resultado para a função de retorno de chamada
    function calcularDistancia(modo_viagem, origin, destination) {

        var DistanceMatrixService = new google.maps.DistanceMatrixService();
        DistanceMatrixService.getDistanceMatrix(
            {
                origins: [origem],
                destinations: [destino],
                travelMode: google.maps.TravelMode[modo_viagem],
                // unitSystem: google.maps.UnitSystem.IMPERIAL, // milhas e pés.
                unitSystem: google.maps.UnitSystem.metric, // kms e metros
                avoidHighways: false,
                avoidTolls: false
            }, salvarResultados);
    }

    // salvar resultados de distância
    function salvarResultados(response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
            $('#resultado').html(err);
        } else {
            var origem = response.originAddresses[0];
            var destino = response.destinationAddresses[0];
            if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
                $('#resultado').html("Desculpe, não disponível para usar este modo de viagem entre" + origem + " and " + destino);
            } else {
                var distancia = response.rows[0].elements[0].distance;
                var duracao = response.rows[0].elements[0].duration;
                var distancia_em_kms = distancia.value / 1000; // Kms
                var distancia_em_milhas = distancia.value / 1609.34; // Milhas
                var texto_duracao = duration.text;
                anexarResultados(distancia_em_kms, distancia_em_milhas, texto_duracao);
                sendAjaxRequest(origem, destino, distancia_em_kms, distancia_em_milhas, texto_duracao);
            }
        }
    }

    // Anexar resultados no HTML
    function anexarResultados(distancia_em_kms, distancia_em_milhas, texto_duracao) {
        $("#resultado").removeClass("hide");
        $('#em_milhas').html(" A distância em milhas é: <span class='badge badge-pill badge-secondary'>" + distancia_em_milhas.toFixed(2) + "</span>");
        $('#em_kms').html("A distância em KMs é: <span class='badge badge-pill badge-s"e"condary'>" + distancia_em_kms.toFixed(2) + "</span>");
        $('#texto_duracao').html("Duração: <span class='badge badge-pill badge-success'>" + texto_duracao + "</span>");
    }

    // finalize a solicitação ajax para salvar os resultados no banco de dados
    

    // ao enviar a rota de exibição, anexe os resultados e envie a calcularDistancia para a solicitação ajax
    $('#distancia_form').submit(function (e) {
        e.preventDefault();
        var origem = $('#origem').val();
        var destino = $('#destino').val();
        var modo_viagem= $('#modo_viagem').val();
        var exibir_direcoes = new google.maps.DirectionsRenderer({'draggable': false});
        var servicos_direcoes = new google.maps.DirectionsService();
        exibirRota(modo_viagem, origem, destino, servicos_direcoes, exibir_direcoes);
        calcularDistancia(modo_viagem, origem, destino);

        console.log(calcularDistancia(modo_viagem, origem, destino));
    });

});



