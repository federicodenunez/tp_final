const audioFiles = [
    "./audios/lucas/Love was really gone.m4a",
    "./audios/lucas/_3005.m4a",
    "./audios/lucas/PARADIs.m4a",
    "./audios/lucas/Perfect circle.m4a",
    "./audios/lucas/Ew.m4a",
    "./audios/lucas/Cigarettes.m4a",
    "./audios/lucas/I wonder.m4a",
    "./audios/lucas/_16.m4a",
    "./audios/lucas/The jungle.m4a",
    "./audios/lucas/The fall.m4a",

    "./audios/fede/Yellow.m4a",
    "./audios/fede/Tired influencer.m4a",
    "./audios/fede/Rapp.m4a",
    "./audios/fede/La maquina.m4a",
    "./audios/fede/Giorgio.m4a",
    "./audios/fede/Pasajera.m4a",
    "./audios/fede/Viernes.m4a",
    "./audios/fede/Your mother.m4a",
    "./audios/fede/Mockingbird.m4a",
    "./audios/fede/Secreto.m4a",
];

// funcion para tocar el audio de cada nota en el step correspondiente
function playM4A(Audio_a_tocar) {
    const audio = new Audio(Audio_a_tocar);
    audio.play();
}

// funcion para tocar la escala completa con el boton
document.addEventListener('DOMContentLoaded', function() {
    const playButton1 = document.getElementById('playButton1');
    const playButton2 = document.getElementById('playButton2');
  
    playButton1.addEventListener('click', function() {
      handleButtonClick('./audios/Escala Fede completa.m4a', playButton1);
    });
  
    playButton2.addEventListener('click', function() {
      handleButtonClick('./audios/Escala Lucas.m4a', playButton2);
    });
  });
  
  function handleButtonClick(audioUrl, button) {
    const audio = new Audio(audioUrl);
  
    // Change the SVG button to the "playing" state
    button.innerHTML = '<image href="./botones/boton_played.svg" width="100" height="100" />';
  
    // Play the audio
    audio.play();
  
    // Wait for the audio to finish playing
    audio.addEventListener('ended', function() {
      // Change the SVG button back to the initial state
      button.innerHTML = '<image href="./botones/boton_play.svg" width="100" height="100" />';
    });
  }
  

// using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.75);
    step.style("height", stepH + "px");

    var figureHeight = window.innerHeight / 2;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;

    figure
        .style("height", figureHeight + "px")
        .style("top", figureMarginTop + "px");

    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}

// inicializo el indice para los audios
//let audio_index = 0;

// scrollama event handlers
function handleStepEnter(response) {
    console.log(response);
    // response = { element, direction, index }

    // add color to current step only
    step.classed("is-active", function (d, i) {
        return i === response.index;
    });

    // update graphic based on step
    figure.select("p").text(response.index + 1);

    // ocultar todas las imagenes
  d3.selectAll('#container_img img')
  .style('display', 'none')

  // mostrar la correcta
  // response.index -> me da el indice en el que estamos
  d3.select("#img"+response.index)
  .style('display', 'block')

  // Toca el audio correspondiente
  playM4A(audioFiles[response.index-4]);
  console.log(response.index-4);
}


function init() {

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            step: "#scrolly article .step",
            offset: 0.33,
            debug: false
        })
        .onStepEnter(handleStepEnter);
}

// kick things off
init();