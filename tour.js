class Tour{

    cities = new Array();

    constructor(arrayCities)   // city[]
    {
        this.distance = 0;
        this.fitness = 0;

        if(arguments.length == 1)
        {
            for(let i=0;i<arrayCities.length;i++)
            {
                this.cities[i] = arrayCities[i];
            }
        }
    }

    getTour()
    {
        return this.cities;
    }

    clone(anotherTour)  // tour
    {
        clearArray(this.cities);
        for(let i=0;i<anotherTour.size();i++)
        {
            this.cities[i] = anotherTour.cities[i];
        }
    }

    cloneVisited(anotherTour)
    {
        clearArray(this.cities);
        for(let i=0;i<anotherTour.size();i++)
        {
            if(i==anotherTour.size()-1)
                this.cities[i] = anotherTour.cities[0];
            else
                this.cities[i] = anotherTour.cities[i+1];
        }
    }

    printTour()
    {
        if(this.size()==0)
            return "";

        let citiesName = "";
        for(let i=0;i<this.cities.length;i++)
        {
            citiesName = citiesName + this.cities[i].getName() + " → ";
        }
        citiesName = citiesName + this.cities[0].getName();
        return citiesName;
    }

    printVisited()
    {
        if(this.size()==0)
            return "";
        let citiesName = "";
        for(let i=0;i<this.cities.length;i++)
        {
            citiesName = citiesName + this.cities[i].getName();
            if(i!= this.size()-1)
                citiesName += ", ";

        }
        // citiesName = citiesName + this.cities[0].getName();
        return citiesName;
    }

    setCity(tourPosition, city) // int, city
    {
        this.cities.splice(tourPosition, 1, city);
        // If the tours been altered we need to reset the fitness and distance
        this.distance = 0;
        this.fitness = 0;
    }

    addCity(city)   // city
    {
        this.cities.push(city);
    }

    removeCity(cityTBR) // city
    {
        this.cities.splice(this.getCityIndex(cityTBR), 1);
    }

    getCityIndex(city)  // int
    {
        return this.cities.indexOf(city);
    }

    findIndexByName(cityName)   // string
    {
        return this.cities.findIndex(city => city.name == cityName);
    }

    getCity(tourPosition)   // int
    {
        return this.cities[tourPosition];
    }

    generateIndividual()
    {
        let temp = this.cities[0];
        this.cities.shift();
        shuffleArray(this.cities);
        this.cities.unshift(temp);
        this.distance = 0;
        this.fitness = 0;
    }

    size()
    {
        return this.cities.length;
    }

    pop()
    {
        this.cities.pop();
    }

    // Gets the total distance of the tour
    getDistance()
    {
        if(this.distance == 0)
        {
            let tourDistance = 0;
            for (let i = 0; i < this.cities.length; i++) {
                let fromCity = this.getCity(i);
                let destinationCity;

                if (i + 1 < this.cities.length) {
                    destinationCity = this.getCity(i + 1);
                }
                else {
                    destinationCity = this.getCity(0);
                }

                tourDistance = tourDistance + fromCity.distanceTo(destinationCity);
            }
            this.distance = tourDistance;
        }
        return this.distance;
    }

    swapCities(index1, index2)  // int, int
    {
        let temp = this.cities[index1]
        this.cities[index1] = this.cities[index2];
        this.cities[index2] = temp;
        this.distance = 0;
    }

    clear()
    {
        clearArray(this.cities);
    }

    getFitness()
    {
        if (this.fitness == 0) {
            this.fitness = (10000) / this.getDistance();
        }
        return this.fitness;
    }


    containsCity(city)  // return boolean
    {
        return this.cities.includes(city);
    }

}
