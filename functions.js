function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function acceptanceProbability(energy, newEnergy, temperature) {
    // If the new solution is better, accept it
    if (newEnergy < energy) {
        return 1.0;
    }
    // If the new solution is worse, calculate an acceptance probability
    return Math.exp((energy - newEnergy) / temperature);
}

function clearArray(array) {
    while (array.length) {
        array.pop();
    }
}

function printArray(array) {
    let string = "";
    for(let i=0; i<array.length;i++)
    {
        string += array[i];

        if(i!=array.length-1)
            string += ", ";
    }
    return string;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function updateSigma(sigma, graph) {
    sigma.graph.clear();
    sigma.graph.read(graph);
    sigma.refresh();
}


function simpleGreedy(tour, TM)
{
    let unvisited = new Tour(TM.getTour());
    let startIndex = 0;
    let nextIndex = -1;
    let currentCity = TM.getTour()[startIndex];
    let nextCity;
    tour.clear();
    tour.addCity(currentCity);
    unvisited.cities.splice(unvisited.cities.findIndex(city => city.name == currentCity.getName()), 1);

    for(let i=0;i<TM.size()-1;i++)
    {

        nextIndex = currentCity.nearestCity(unvisited.cities);
        nextCity = unvisited.cities[nextIndex];
        currentCity = nextCity;
        tour.addCity(currentCity);
        unvisited.cities.splice(unvisited.cities.findIndex(city => city.name == currentCity.getName()), 1);
    }
    //
    // console.log(tour.printTour());
    // console.log(tour.getDistance());
}

function convertCityToNodes(TM, graph)
{
    clearArray(graph.nodes);
    let nodeSize = 10;
    // let nodeColor = "black";
    let nodeColor = "#2196F3";
    for(let i=0;i<TM.size();i++)
    {
        if(i==0)
            nodeColor = "#50c878";
        else
            nodeColor = "#2196F3";

        graph.nodes.push(
            {
                id: TM.getTour()[i].name,
                label: TM.getTour()[i].name,
                x: TM.getTour()[i].x,
                y: TM.getTour()[i].y,
                size: nodeSize,
                color: nodeColor,
            }
        )
    }
}

function convertCityToNodes_black(TM, graph)
{
    clearArray(graph.nodes);
    let nodeSize = 10;
    // let nodeColor = "black";
    let nodeColor = "black";
    for(let i=0;i<TM.size();i++)
    {
        graph.nodes.push(
            {
                id: TM.getTour()[i].name,
                label: TM.getTour()[i].name,
                x: TM.getTour()[i].x,
                y: TM.getTour()[i].y,
                size: nodeSize,
                color: nodeColor,
            }
        )
    }
}

function convertSwapCityToNodes(tour, graph, pos1, pos2)
{
    clearArray(graph.nodes);
    let nodeSize = 10;
    let nodeColor = "#2196F3";
    for(let i=0;i<tour.size();i++)
    {
        if(i==0)
            nodeColor = "#50c878";
        else if (i==pos1 || i==pos2)
            nodeColor = "#a95aec";
        else
            nodeColor = "#2196F3";

        graph.nodes.push(
            {
                id: tour.getCity(i).name,
                label: tour.getCity(i).name,
                x: tour.getCity(i).x,
                y: tour.getCity(i).y,
                size: nodeSize,
                color: nodeColor,
            }
        )
    }
}

function convertTourToEdges(tour, graph)
{
    clearArray(graph.edges);
    for(let i=0;i<tour.size();i++)
    {
        if (i + 1 < tour.size()) {
            graph.edges.push(
                {
                    id: "E" + i.toString(),
                    source: tour.getCity(i).getName(),
                    target: tour.getCity(i+1).getName(),
                    color: '#282c34',
                    type:'arrow',
                    size: 3,
                    label: Math.round(tour.getCity(i).distanceTo(tour.getCity(i+1))).toString(),
                }
            )
        }
        else
        {
            graph.edges.push(
                {
                    id: "E" + i.toString(),
                    source: tour.getCity(i).getName(),
                    target: tour.getCity(0).getName(),
                    color: '#282c34',
                    type:'arrow',
                    size: 3,
                    label: Math.round(tour.getCity(i).distanceTo(tour.getCity(0))).toString(),
                }
            )
        }
    }
}


function toast(msg, time=1000)
{
    let x = document.getElementById("toast");
    x.innerText = msg;
    x.className = "toast show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, time);
}

$( document ).ready(function() {
    $("#nav-placeholder").load("nav.html");
});

function updateStep()
{
    let x = document.getElementsByClassName("highlight");
    x[0].className = x[0].className.replace(" highlight", "");
    step = "s" + stepIndex.toString();
    document.getElementById(step).className += " highlight";
    stepIndex++;
}

function convertSwapCityToNodes_black(tour, graph, pos1, pos2)
{
    clearArray(graph.nodes);
    let nodeSize = 10;
    let nodeColor = "#2196F3";
    for(let i=0;i<tour.size();i++)
    {
        if (i==pos1 || i==pos2)
            nodeColor = "#2196F3";
        else
            nodeColor = "black";

        graph.nodes.push(
            {
                id: tour.getCity(i).name,
                label: tour.getCity(i).name,
                x: tour.getCity(i).x,
                y: tour.getCity(i).y,
                size: nodeSize,
                color: nodeColor,
            }
        )
    }
}