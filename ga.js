class GA
{
    /* GA parameters */
    // mutationRate = 0.015;
    tournamentSize = 10;
    elitism = true;
    // eliteSize = 1;

    constructor(pop, TM, mutationRate, eliteSize) {
        this.population = pop;
        this.tourManager = TM;
        this.mutationRate = mutationRate;
        this.eliteSize = eliteSize;
    }

    // Evolves a population over one generation
    evolvePopulation(pop, tourManager) // Population, TourManager
    {
        // console.log("inside function");
        // console.log("mutation rate: " + this.mutationRate);
        // console.log("population size: "+ pop.populationSize());
        // console.log("elite: " + this.eliteSize);


        this.population = pop;
        this.tourManager = tourManager;

        let newPopulation = new Population(pop.populationSize(), tourManager, false);

        // Keep our best individual if elitism is enabled
        let elitismOffset = 0;
        if (this.elitism) {
            // pop.sort();
            // for(let i=0;i<this.eliteSize;i++)
            // {
            //     newPopulation.saveTour(i, pop.getFittest());
            // }
            // elitismOffset = this.eliteSize;

            newPopulation.saveTour(0, pop.getFittest());
            elitismOffset = 1;
        }

        // console.log(newPopulation);

        // Crossover population
        // Loop over the new population's size and create individuals from Current population
        for (let i = elitismOffset; i < newPopulation.populationSize(); i++) {
            // Select parents
            let parent1 = this.tournamentSelection(pop);
            let parent2 = this.tournamentSelection(pop);
            let p1 = this.crossover(parent1, parent2);
            let p2 = this.crossover(parent1, parent2);


            // Crossover parents
            let child = this.crossover(p1, p2);
            // Add child to new population
            newPopulation.saveTour(i, child);

            // console.log("parent1");
            // console.log(parent1);
            // console.log("parent2");
            // console.log(parent2);
            // child.getDistance();
            // console.log("child");
            // console.log(child);


            // console.log(child);
            // // console.log("i: " + i);
            // // console.log("p1: " + parent1.size());
            // // console.log("p2: " + parent2.size());
            // // console.log();
        }

        // console.log("before mutate");
        // console.log(newPopulation);


        // Mutate the new population a bit to add some new genetic material
        for (let i = elitismOffset; i < newPopulation.populationSize(); i++) {
            this.mutate(newPopulation.getTour(i));
        }

        // console.log("after mutate");
        // console.log(newPopulation);

        return newPopulation;
    }

    // Applies crossover to a set of parents and creates offspring
    crossover(parent1,parent2) // tour, tour
    {
        // Create new child tour
        let child = new Tour();
        child.cities = new Array(parent1.size());

        let p1 = new Tour();
        let p2 = new Tour();
        p1.clone(parent1);
        p2.clone(parent2);

        // add start city to child solution and remove it from parents
        child.setCity(0, parent1.getCity(0));
        p1.cities.shift();
        p2.cities.shift();

        // Get start and end sub tour positions for parent1's tour
        let startPos = Math.floor(Math.random() * parent1.size());
        let endPos = Math.floor(Math.random() * parent1.size());
        if(startPos == endPos)
        {
            if(startPos == p1.size())
            {
                startPos--;
            }
            else
            {
                startPos++;
            }
        }
        if(startPos > endPos)
        {
            let temp = 0;
            temp = startPos;
            startPos = endPos;
            endPos = temp;
        }

        // console.log("start: " + startPos + "  end: " + endPos);

        for(let i=0;i<p1.size();i++)
        {
            if (i >= startPos && i <= endPos) {
                child.setCity(i+1, p1.getCity(i));
            }
        }

        //
        // console.log("parent1");
        // console.log(parent1.cities);
        // console.log("child");
        // console.log(child.cities);

        for(let i=0;i<p2.size();i++)
        {
            // If child doesn't have the city add it
            if (!child.cities.includes(p2.getCity(i))) {
                // Loop to find a spare position in the child's tour
                for (let ii = 0; ii < p2.size() + 1; ii++) {
                    // Spare position found, add city
                    if (child.getCity(ii) == null) {
                        child.setCity(ii, p2.getCity(i));
                        break;
                    }
                }
            }
        }
        //
        // console.log("parent2");
        // console.log(parent2.cities);
        // console.log("child");
        // console.log(child.cities);

        return child;
    }

    // Mutate a tour using swap mutation
    mutate(tour) // Tour
    {
        // Loop through tour cities
        let tourPos1 = 1; // skip start city
        for(tourPos1; tourPos1 < tour.size(); tourPos1++){
            // Apply mutation rate
            if(Math.random() < this.mutationRate){
                // Get a second random position in the tour
                let tourPos2 = Math.floor(tour.size() * Math.random());
                if( tourPos2 == 0)
                    tourPos2++;

                // Swap them around
                tour.swapCities(tourPos1, tourPos2);

            }
        }
    }

    // Selects candidate tour for crossover
    tournamentSelection(pop) // Population
    {
        // Create a tournament population
        let tournament = new Population(this.tournamentSize, this.tourManager, false);

        // For each place in the tournament get a random candidate tour and add it
        for (let i = 0; i <this.tournamentSize; i++) {
            let randomId = Math.floor(Math.random() * pop.populationSize());
            if(randomId==0)
                randomId++;
            tournament.saveTour(i, pop.getTour(randomId));
        }
        // Get the fittest tour
        let fittest = tournament.getFittest();
        return fittest;
    }
}