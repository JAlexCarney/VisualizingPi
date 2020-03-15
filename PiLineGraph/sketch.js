// initialize global varibles

// load external resources needed for script
function preload() {
  let osc;
  let canvas;
}

// sut up scene on load of webpage
function setup() {
  // create canvas
  let div = document.getElementById("content");
  let canvas = createCanvas(1920, 1080);
  canvas.parent(div);
  
  //set drawing style
  //noStroke();
  colorMode(HSB, 1);
  frameRate(30);
  textFont('Helvetica');

  // create audio
  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
}

let graphStart = 0;
let seconds = 20;
let framesPerDigit = 15;
let count = 0;
function draw() {
  
  if(frameCount % framesPerDigit == 0)
  {
    graphStart += 1;
  }
  
  drawBG();
  drawGraph(graphStart, frameCount % framesPerDigit);

  if(frameCount <= seconds*30){
    //save("PIGraph_" + ("00000" + frameCount).slice(-5));
  }
}

function drawBG() {
    fill("#150F4C");
    rect(0, 0, width, height);
}

function drawGraph(start, xOff)
{
    let nodes = 30;

    for(let x = -1; x < nodes+1; x++)
    {
      let y = ( height/10 * pi[x + start] );
      let x1 = (x * width/nodes) - (xOff/framesPerDigit * width/nodes) + (3*width)/(2*nodes);
      let y1 = height - y - height/20;
      y = ( height/10 * pi[x + 1 + start] );
      let x2 = ((x+1) * width/nodes) - (xOff/framesPerDigit * width/nodes) + (3*width)/(2*nodes);
      let y2 = height - y - height/20;

      
      stroke("#E5C12C");
      strokeWeight(ceil(width/(nodes*4)));
      line(x1, y1, x2, y2);
      strokeWeight(5);
      fill(pi[x+start]/10, 0.75, 1);
      circle(x1, y1, ceil(width/(nodes*2)));
    }
    for(let i = 0; i < 10; i++)
    {
      noStroke();
      fill(i/10, 0.75, 1)
      rect(0, height - (i+1)*height/10, width/nodes, height/10);
      
      stroke(i/10, 0.75, 0.25);
      strokeWeight(5);
      textAlign(CENTER, CENTER);
      textSize(width/nodes);
      fill(i/10, 0.75, 0.5);
      text(i, 5, height - (i+1)*height/10, width/nodes, height/10);
    }

    let notesNums = [57, 59, 60, 62, 64, 65, 67, 69, 71, 72];
    if(start >= 0)
    {
      
      if(xOff == 0){
      //playNote(notesNums[pi[end]], 10);
      osc.freq(midiToFreq(notesNums[pi[start]]));
      osc.fade(0.3,0.3);
      }if(xOff*15%15 == 8)
      {
        osc.fade(0.0, 0.2);
      }
    }
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.1);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.1);
    }, duration);
  }
}

function fullscreenCanvas(el){

  if(el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen();
  }
  else {
    el.mozRequestFullScreen();
  }            
}