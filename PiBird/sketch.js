// initialize global varibles
let osc;
let canvas;
let birds;

// load external resources needed for script
function preload() {
  
}

// sut up scene on load of webpage
function setup() {
  // create canvas
  let div = document.getElementById("content");
  //let canvas = createCanvas(1080, 720);
  canvas = createCanvas(1920, 1080);
  canvas.parent(div);
  
  //set drawing style
  //noStroke();
  frameRate(30);
  textAlign(CENTER, CENTER);
  textSize(height/20);
  colorMode(HSB, 1);
  textFont('Helvetica');

  // create audio
  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);

  birds = [];
  for(let i = 0; i < 10; i++)
  {
    birds[i] = [];
    birds[i][0] = new Particle(createVector(0, 0));
    birds[i][0].setColor(i/10, 0.5, 1);
    birds[i][0].size = width/45;
  }

  drawBG();
  drawGraph(-10, 0);
}

let graphEnd = -3;
let seconds = 20;
let framesPerDigit = 30;
let count = 0;
let drawing = false;
function draw() {

  if(drawing){
    
    if(count % framesPerDigit == 0)
    {
      graphEnd += 1;
    }

    drawBG();
    drawGraph(graphEnd, (count%framesPerDigit)/framesPerDigit);

    if(count <= seconds*30){
      //save("PICircleGraph_" + ("00000" + frameCount).slice(-5));
    }

    count++;
  }
}

let clickCount = 0;
function keyPressed()
{
  if(keyCode == 70)
  {
    let fs = fullscreen(canvas);
    fullscreen(!fs);
    fullscreenCanvas();
  }
  else if(keyCode == 80)
  {
    drawing = !drawing;
  }

  clickCount+=1;
}

function drawBG() {
    fill("#150F4C");
    rect(0, 0, width, height);
}

let histogram = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
function drawGraph(end, progress)
{
  if(end >= 0 && progress == 0)
  {
    // update histogram
    histogram[pi[end]] += 1;
    birds[pi[end]][histogram[pi[end]]] = new Particle(createVector(0, 0));
    birds[pi[end]][histogram[pi[end]]].setColor(pi[end]/10, 0.5, 1);
    birds[pi[end]][histogram[pi[end]]].size = width/45;
  }
  console.log(histogram);
  // draw birds
  push();
  translate(0, height + width/45);
  for(let i = 0; i < 10; i++)
  {
    translate(0, -height/10);
    push();
    for(let j = 0; j <= histogram[i]; j++)
    {
      if(pi[end] != i)
      {
        birds[i][j].drawTriangle();
      }
      else
      {
        // draw updating bird
        push();
        birds[i][j].rotate(2*PI/framesPerDigit);
        birds[i][j].move((width/15)/framesPerDigit);
        birds[i][j].drawTriangle();
        pop();
      }
      //translate(width/15, 0);
    }
    pop();
  }
  pop();
  

  // draw axis
  for(let i = 0; i < 10; i++)
  {
    noStroke();
    fill(i/10, 0.75, 1);
    rect(0, height - (i+1)*height/10, width/30, height/10);
    
    stroke(i/10, 0.75, 0.25);
    strokeWeight(5);
    //noStroke();
    textAlign(CENTER, CENTER);
    textSize(width/30);
    fill(i/10, 0.75, 0.5);
    text(i, width/60, height - (i+1)*height/10 + height/20);
  }
  // draw axis with notes
  let notesNums = [57, 59, 60, 62, 64, 65, 67, 69, 71, 72];

  if(end >= 0)
  {
    
    if(progress == 0){
    //playNote(notesNums[pi[end]], 10);
    osc.freq(midiToFreq(notesNums[pi[end]]));
    osc.fade(0.3,0.3);
    }if(progress*framesPerDigit%framesPerDigit == 10)
    {
      osc.fade(0.0, 0.6);
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