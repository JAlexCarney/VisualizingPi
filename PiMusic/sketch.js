// initialize global varibles
let osc;
let canvas;

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


  // set the stage
  drawBG();
  drawGraph(-10, 1);
}

let graphEnd = -3;
let seconds = 20;
let framesPerDigit = 15;
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

function drawGraph(end, progress)
{
  // draw staff
  for(let i = 1; i < 10; i++)
  {
    if(i%2 == 0)
    {
      stroke(i/10, 0.75, 0.25);
      strokeWeight(10);
      line(0, height - (i+1)*height/10 + height/20, width, height - (i+1)*height/10 + height/20);
    }
  }

  let nodes = 30;
  let start = end;
  let xOff = progress;
  for(let x = -1; x < nodes+1; x++)
  {
    let y = ( height/10 * pi[x + start] );
    let x1 = (x * width/nodes) - (xOff/framesPerDigit * width/nodes) + (3*width)/(2*nodes);
    let y1 = height - y - height/20;
    y = ( height/10 * pi[x + 1 + start] );
    let x2 = ((x+1) * width/nodes) - (xOff/framesPerDigit * width/nodes) + (3*width)/(2*nodes);
    let y2 = height - y - height/20;

    
    stroke(pi[x+start]/10, 0.75, 0.5);
    strokeWeight(ceil(width/(nodes*4)));
    strokeWeight(5);
    fill(pi[x+start]/10, 0.75, 1);
    circle(x1, y1, ceil(width/(nodes)));
  }

  // draw axis with notes
  let notes = ["A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
  let notesNums = [57, 59, 60, 62, 64, 65, 67, 69, 71, 72];
  for(let i = 0; i < 10; i++)
  {
    noStroke();
    fill(i/10, 0.75, 1);
    rect(width - width/30, height - (i+1)*height/10, width/30, height/10);
    
    stroke(i/10, 0.75, 0.25);
    strokeWeight(5);
    //noStroke();
    textAlign(CENTER, CENTER);
    textSize(width/45);
    fill(i/10, 0.75, 0.5);
    text(notes[i], width - width/60, height - (i+1)*height/10 + height/20);
  }

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

  if(end >= 0)
  {
    
    if(progress == 0){
    //playNote(notesNums[pi[end]], 10);
    osc.freq(midiToFreq(notesNums[pi[end]]));
    osc.fade(0.3,0.3);
    }if(progress*15%15 == 8)
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