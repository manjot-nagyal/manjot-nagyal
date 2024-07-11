// class DNA contains functions to create a new DNA object, calculate fitness, crossover, and mutate
// getPhrase() returns a string of the genes
// calcFitness() calculates the fitness of the DNA object based on the target phrase
// crossover() creates a new DNA object from two parent DNA objects
// mutate() mutates the DNA object give a mutation rate 
class DNA {
  constructor(num) {
    this.genes = Array.from({ length: num }, () => newChar());
    this.fitness = 0;
  }

  getPhrase() {
    return this.genes.join("");
  }
  
  calcFitness(target) {
    this.fitness = this.genes.reduce((acc, gene, i) => acc + (gene === target[i] ? 1 : 0), 0) / target.length;
  }

  crossover(partner) {
    const child = new DNA(this.genes.length);
    const midpoint = Math.floor(Math.random() * this.genes.length);
    child.genes = this.genes.map((gene, i) => (i > midpoint ? gene : partner.genes[i]));
    return child;
  }

  mutate(mutationRate) {
    this.genes = this.genes.map(gene => (Math.random() < mutationRate ? newChar() : gene));
  }
}

// Helper function to generate a new character
function newChar() {
  const c = Math.floor(Math.random() * (123 - 63) + 63);
  return String.fromCharCode(c === 63 ? 32 : c === 64 ? 46 : c);
}
