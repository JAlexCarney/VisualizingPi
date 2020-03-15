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

  // create audio
  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);

  drawBG()
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

function drawBG() {
    fill("#150F4C");
    rect(0, 0, width, height);
}

function drawGraph(end, progress)
{
  
  // Draw lines
  push();
  translate(width/2, height/2);
  strokeWeight(10);
  for(let i = 0; i < end; i++)
  {
    stroke(pi[i]/10, 0.75, 1);
    noFill();

    if(pi[i] != pi[i+1])
    {
      let v1 = createVector(0, -height/2 + height/9);
      v1.rotate(PI/5 * pi[i]);
      let v2 = createVector(0, -height/2 + height/9);
      v2.rotate(PI/5 * pi[i+1]);
      
      line(v1.x, v1.y, v2.x, v2.y);
    }
    else
    {
      let v1 = createVector(0, -height/2 + height/9 - height/20);
      v1.rotate(PI/5 * pi[i]);
      circle(v1.x, v1.y, height/10);
    }
  }

  // Draw in progress lines
  if(pi[end] != pi[end+1])
  {
      stroke(pi[end]/10, 0.75, 1);

      let v1 = createVector(0, -height/2 + height/9);
      v1.rotate(PI/5 * pi[end]);
      let v2 = createVector(0, -height/2 + height/9);
      v2.rotate(PI/5 * pi[end+1]);

      line(v1.x, v1.y, lerp(v1.x, v2.x, progress), lerp(v1.y, v2.y, progress));
      fill(0);
      circle(lerp(v1.x, v2.x, progress), lerp(v1.y, v2.y, progress), height/15);
  }
  else
  {
    push();
    let v = createVector(0, -height/2 + height/9 - height/20);
    v.rotate(PI/5 * pi[end]);
    translate(v.x, v.y);
    let v2 = createVector(0, height/20);
    v2.rotate(PI/5 * pi[end]);
    for(let i = 0; i < progress*framesPerDigit*4; i++)
    {
      stroke(pi[end]/10, 0.75, 1);

      let v1 = createVector(0, height/20);
      v1.rotate(PI/5 * pi[end]);
      v1.rotate(2*PI * i/(framesPerDigit*4));
      v2 = createVector(0, height/20);
      v2.rotate(PI/5 * pi[end]);
      v2.rotate(2*PI * (i+1)/(framesPerDigit*4));

      line(v1.x, v1.y, v2.x, v2.y);      
    }
    fill(0);
    circle(v2.x, v2.y, height/15);
    pop();
  }

  // Draw in nodes
  strokeWeight(3);
  for(let i = 0; i < 10; i++)
  {
    let v = createVector(0, -height/2 + height/9);
    v.rotate(PI/5 * i);
    noStroke();
    fill(i/10, 0.75, 1)
    circle(v.x, v.y, height/17)
    stroke(i/10, 0.75, 0.25);
    fill(i/10, 0.75, 0.5);
    text(i, v.x, v.y)
  }
  pop();

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