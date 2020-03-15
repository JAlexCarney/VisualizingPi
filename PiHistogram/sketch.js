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
  if(end >= 0)
  {
    // initialize histogram
    let histogram = [];
    for(let i = 0; i < 10; i++)
    {
      histogram.push(0);
    }

    // update histogram
    for(let i = 0; i < end; i++)
    {
      histogram[pi[i]] += 1;
    }

    // draw histogram
    push();
    translate(width/30, height);
    for(let i = 0; i < 10; i++)
    {
      translate(0, -height/10);
      for(let j = 0; j < histogram[i]; j++)
      {
        stroke(i/10, 0.75, 1);
        strokeWeight(2);
        fill(i/10, 0.75, j/60 + 1/5);
        rect(j*width/30,1,width/30,height/10 - 2);
      }
    }
    pop();

    // draw updating digit
    stroke(pi[end]/10, 0.75, 1);
    strokeWeight(2);
    fill(pi[end]/10, 0.75, histogram[pi[end]]/60 + 1/5);
    let y = height - pi[end] * height / 10 - height/10;
    let x = histogram[pi[end]] * width/30 + width/30;
    rect(x, y, progress * width/30, height/10 - 1);
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
  // draw axis with notes
  let notesNums = [57, 59, 60, 62, 64, 65, 67, 69, 71, 72];

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