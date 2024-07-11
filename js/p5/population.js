// class Population contains a list of DNA objects and methods to manage them
// constructor initializes the population with a target phrase, mutation rate, and population size
// calcFitness() calculates the fitness of each DNA object in the population
// naturalSelection() creates a mating pool based on the fitness of each DNA object
// generate() creates a new population of DNA objects using the mating pool
// getBest() returns the best phrase in the population
// evaluate() checks if the best phrase in the population matches the target phrase
// isFinished() returns true if the best phrase matches the target phrase
// getGenerations() returns the number of generations
// getAverageFitness() returns the average fitness of the population
// allPhrases() returns a string containing all the phrases in the population

class Population {
  constructor(p, m, num) {
    this.target = p;
    this.mutationRate = m;
    this.perfectScore = 1;
    this.generations = 0;
    this.finished = false;
    this.best = "";
    this.population = Array.from({ length: num }, () => new DNA(this.target.length));
    this.matingPool = [];
    this.calcFitness();
  }

  calcFitness() {
    this.population.forEach(individual => individual.calcFitness(this.target));
  }

  naturalSelection() {
    this.matingPool = [];
    const maxFitness = Math.max(...this.population.map(individual => individual.fitness));
    this.population.forEach(individual => {
      const fitness = map(individual.fitness, 0, maxFitness, 0, 1);
      const n = Math.floor(fitness * 100);
      this.matingPool.push(...Array(n).fill(individual));
    });
  }

  generate() {
    this.population = this.population.map(() => {
      const partnerA = this.matingPool[Math.floor(Math.random() * this.matingPool.length)];
      const partnerB = this.matingPool[Math.floor(Math.random() * this.matingPool.length)];
      const child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      return child;
    });
    this.generations++;
  }

  getBest() {
    return this.best;
  }

  evaluate() {
    const fittest = this.population.reduce((max, individual, i) => {
      return individual.fitness > max.fitness ? individual : max;
    });
    this.best = fittest.getPhrase();
    this.finished = fittest.fitness === this.perfectScore;
  }

  isFinished() {
    return this.finished;
  }

  getGenerations() {
    return this.generations;
  }

  getAverageFitness() {
    const totalFitness = this.population.reduce((acc, individual) => acc + individual.fitness, 0);
    return totalFitness / this.population.length;
  }

}
