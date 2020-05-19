class Population
{
    // Holds population of tours
    tours = new Array(); // Tour[]

    // Construct a population
    constructor(populationSize, tourManger, initialise) // int, TourManager, boolean
    {
        this.tours = new Array(populationSize);
        // If we need to initialise a population of tours do so
        if (initialise) {
            // Loop and create individuals
            for (let i = 0; i < this.populationSize(); i++) {
                let newTour = new Tour(tourManger.getTour());
                newTour.generateIndividual();
                this.saveTour(i, newTour);
            }
        }
    }

    clone(pop) // Population
    {
        clearArray(this.tours);
        for(let i=0;i<pop.populationSize();i++)
        {
            this.tours[i] = pop.tours[i];
        }
    }

    // Saves a tour
    saveTour(index, tour) // int, Tour
    {
        this.tours[index] = tour;
    }

    // Gets a tour from population
    getTour(index) // int
    {
        return this.tours[index];
    }

    // Gets the best tour in the population
    getFittest()
    {
        let fittest = this.tours[0];

        // Loop through individuals to find fittest
        for (let i = 0; i < this.populationSize(); i++) {
            // console.log(this.getTour(i))
            if (fittest.getFitness() <= this.getTour(i).getFitness()) {
                fittest = this.getTour(i);
            }
        }
        return fittest;
    }

    getMeanFitness()
    {
        let avgFitness = 0;

        for (let i = 0; i < this.populationSize(); i++) {
            avgFitness += this.tours[i].getFitness();
        }

        avgFitness = avgFitness / this.populationSize();

        return avgFitness;
    }

    getWorst()
    {
        let worst = this.tours[0];

        // Loop through individuals to find fittest
        for (let i = 0; i < this.populationSize(); i++) {
            if (worst.getDistance() <= this.getTour(i).getDistance()) {
                worst = this.getTour(i);
            }
        }
        return worst;
    }

    getMeanDistance()
    {
        let avgDistance = 0;

        for (let i = 0; i < this.populationSize(); i++) {
            avgDistance += this.tours[i].getDistance();
        }

        avgDistance = avgDistance / this.populationSize();

        return avgDistance;
    }


    getBestFitness()
    {
        return this.getFittest().getFitness();
    }

    // Gets population size
    populationSize() {
        return this.tours.length;
    }

    sort()
    {
        this.tours.sort(compareTour);
    }
}

function compareTour(t1, t2)
{
    let d1 = t1.getDistance();
    let d2 = t2.getDistance();

    let comparison = 0;
    if(d1 < d2)
        comparison = -1;
    else if (d1 > d2)
        comparison = 1;
    return comparison
}