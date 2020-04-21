class TourManager {

    destinationCities = new Array();

    // Adds a destination city
    addCity(city) {
        this.destinationCities.push(city);
    }

    // Get a city
    getCity(index){
        return this.destinationCities[index];
    }

    getTour()
    {
        return this.destinationCities;
    }

    size()
    {
        return this.destinationCities.length;
    }

    findIndexByName(cityName)
    {
        return this.destinationCities.findIndex(city => city.name == cityName)
    }

    clone(anotherTM)
    {
        clearArray(this.destinationCities);
        for(let i=0;i<anotherTM.size();i++)
        {
            this.destinationCities.push(anotherTM.getCity(i));
        }
    }

    clear()
    {
        clearArray(this.destinationCities);
    }

}
