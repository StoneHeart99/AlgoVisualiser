class City {

    constructor(name, x, y) {

        if(arguments.length == 1)
        {
            this.name = name;
            this.x = Math.floor(Math.random() * 200);
            this.y = Math.floor(Math.random() * 200);
        }
        else
        {
            this.name = name;
            this.x = x;
            this.y = y;
        }

    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getName() {
        return this.name;
    }

    distanceTo(city) {
        let xDistance = Math.abs(this.x - city.getX());
        let yDistance = Math.abs(this.y - city.getY());
        let distance = Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));

        return distance;
    }

    nearestCity(citiesList)
    {

        let shortest = Number.MAX_SAFE_INTEGER;
        let cityIndex = -1;
        for(let i=0;i<citiesList.length;i++)
        {
            if(citiesList[i].getName()==this.getName())
            {
                continue;
            }

            let distance = this.distanceTo(citiesList[i])
            if(distance < shortest)
            {
                shortest = distance;
                cityIndex = i;
            }
        }
        return cityIndex;
    }

}





