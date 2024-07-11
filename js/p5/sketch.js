let target, popmax, mutationRate, population, bestPhrase;
let avgFitnessHistory = [];
const generationFrameInterval = 20;

function setup() {
  let canvas = createCanvas(1000, 500);
  canvas.parent("p5-sketch");
  background(255);
  target = "Manjot Nagyal";
  popmax = 2000;
  mutationRate = 0.05;
  population = new Population(target, mutationRate, popmax);
}



function draw() {
  background("#132454");

  if (frameCount % generationFrameInterval === 0) {
    population.naturalSelection();
    population.generate();
    population.calcFitness();
    population.evaluate();
    avgFitnessHistory.push(population.getAverageFitness());
  }

  if (population.isFinished()) noLoop();

  if (mouseIsPressed) noLoop();
  else loop();

  displayBestPhrase(population.getBest());
  plotFitness(avgFitnessHistory);
}

function displayBestPhrase(answer) {
  textFont("Courier New");
  textSize(100);
  let x = width - textWidth(answer) - 50;
  let y = 100;

  for (let i = 0; i < answer.length; i++) {
    fill(answer[i] === target[i] ? 255 : "#FA3A00");
    text(answer[i], x, y);
    x += textWidth(answer[i]);
  }
}

function plotFitness(fitnessHistory) {
  strokeWeight(5);
  stroke(255);
  noFill();
  beginShape();
  for (let i = 0; i < fitnessHistory.length; i++) {
    let x = map(i, 0, fitnessHistory.length, 252, width - 250);
    let y = map(fitnessHistory[i], 0, 1, height - 50, height / 3);
    vertex(x, y);
  }
  endShape();


  stroke(255);
  line(250, height / 2, 250, height - 50); // y-axis
  line(250, height - 50, width - 250, height - 50); // x-axis
  strokeWeight(0.5);
  textFont("Helvetica");
  textSize(25);
  fill(255);

  push();
  translate(230, (height + height * 2 / 3) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER);
  text("Fitness", height / 6, 0);
  pop();

  // Draw the last tick mark
  let xEnd = map(fitnessHistory.length - 1, 0, fitnessHistory.length, 250, width - 250);
  strokeWeight(5);
  line(xEnd, height - 40, xEnd, height - 50);
  strokeWeight(0.5);
  textAlign(CENTER);
  text("Generation " + fitnessHistory.length, xEnd, height - 20);
}
