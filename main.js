/* Iniciando o mapa */
function iniciarMapa() {

    /*Opções relacionadas a estrutura do mapa.*/ 
    var mapaOpcoes = {
        /* 
        Incluindo propriedades 
        zoom: Nível de zoom do Mapa. 
        center: Onde a API irá centraliza o Mapa.
        mapTypeId: Tipos de mapas. 
        */
        zoom: 4,
        center: { lat: 0, lng: 0 },
        mapTypeId: 'roadmap',
        streetViewControl: false
    };
    
    /* Mapa */ 
    const mapa = new google.maps.Map(document.getElementById('mapa'), mapaOpcoes);

    /* Eventos: Click Duplo*/
    mapa.addListener('dblclick', function(e){
        var duploClickPosicao = e.latLng;
        marcador(duploClickPosicao);

    });

    function marcador (posicaoSelecionada) {
        const marcador = new google.maps.Marker ({

            /* Posição do meu marcador. */ 
            position: posicaoSelecionada,

            /*Atributos do meu marcador*/ 
            map: mapa,

            /*Animação*/ 
            animation: google.maps.Animation.BOUNCE,

            /*Alterar marcador de posição*/ 
            draggable: true

        });
    };
 
}
window.iniciarMapa = iniciarMapa;

