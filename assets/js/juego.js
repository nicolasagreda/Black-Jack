
// 2C = treboles
// 2D = Diamantes
// 2H = corazones
// 2D = espadas


let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

const btnNuevo = document.querySelector('#btn-Nuevo');
const btnPedir = document.querySelector('#btn-Pedir');
const btnDetener = document.querySelector('#btn-Detener');

const DivCartasJugador = document.querySelector('#jugador-cartas');
const DivCartasComputadora = document.querySelector('#computadora-cartas');


let puntosJugador =  0,
    puntosComputadora = 0;

const puntosHtml = document.querySelectorAll('small');


const crearDeck = () => {
    for( let i = 2; i<=10; i++ ){
        for( tipo of tipos ){
            deck.push(i + tipo);
        }        
    }
    for( tipo of tipos){
        for( esp of especiales ){
            deck.push( esp + tipo);
        }
    }

    deck = _.shuffle(deck);
    console.log(deck);
}

const pedirCarta = () => {
    const carta = deck.pop();
    console.log(deck);

    return carta;
}

const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length -1);
    
    return (isNaN( valor )) ? 
                ( valor === 'A') ? 11 : 10 
                : valor * 1;    
}

crearDeck();

btnPedir.addEventListener('click', () =>  {
    
    let carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta);
    puntosHtml[0].innerText = puntosJugador;
    console.log(puntosJugador);

   const imgCarta = document.createElement('img');
   imgCarta.src = `/assets/cartas/${ carta }.png`;
   imgCarta.classList = 'carta';
   DivCartasJugador.append(imgCarta);

   if( puntosJugador > 21){
       btnPedir.disabled = true;
       turnoCumputadora(puntosJugador);
   }else if( puntosJugador === 21){
       turnoCumputadora(puntosJugador);
   }

})

const turnoCumputadora = ( puntosMinimos ) => {

    do{

        let carta = pedirCarta()

        puntosComputadora = puntosComputadora + valorCarta( carta);
        puntosHtml[1].innerText = puntosComputadora;
        console.log(puntosComputadora);
        
        const imgCarta = document.createElement('img');
        imgCarta.src = `/assets/cartas/${ carta }.png`;
        imgCarta.classList = 'carta';
        DivCartasComputadora.append(imgCarta);

        if ( puntosMinimos > 21 ){
            break;
        }
        
    } while ( (puntosComputadora < puntosMinimos) && (puntosComputadora <= 21) )

    setTimeout(() => {
        
        if( puntosMinimos > 21 ){
            alert(' la computadora gana');
        }else if( puntosComputadora === puntosMinimos){
            alert(' Nadie gana');
        }else if( puntosComputadora > 21){
            alert(' Jugador Gana');
        }else{
            alert(' computadora Gana ')
        }

    }, 100);
}

btnDetener.addEventListener('click', () => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoCumputadora(puntosJugador);

})

btnNuevo.addEventListener('click', () => {
    
    console.clear();

    deck = [];
    crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;


    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText = 0;

    btnPedir.disabled = false;
    btnDetener.disabled = false;

    DivCartasComputadora.innerHTML = '';
    DivCartasJugador.innerHTML = '';

})