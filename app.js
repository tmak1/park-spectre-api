// https://docs.microsoft.com/en-us/bingmaps/v8-web-control/creating-and-hosting-map-controls/creating-a-basic-map-control

var results = [
    {name: "Melbourne Cricket Grounds", location: {lat: -37.819967, long: 144.983449}},
    {name: "Flagstaff Gardens", location: {lat: -37.810680, long: 144.954352}},
    {name: "Emporium Melbourne", location: {lat: -37.812433, long: 144.963787}},
    {name: "City Library", location: {lat: -37.817039, long: 144.965983}},
    {name: "Southern Cross Station", location: {lat: -37.818281, long: 144.952776}},
    {name: "Sea Life Melbourne Aquarium", location: {lat: -37.820640, long: 144.958325}}
  ]
var creatInfoBox = map => {
    //Create an infobox at the center of the map but don't show it.
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);
}


var addPin = (map, result, index) => {
    //Create custom Pushpin
    var pin = new Microsoft.Maps.Pushpin(
        { latitude: result.location.lat, longitude: result.location.long  },
        {
            title: result.name,
            subTitle: '',
            text: index
        });

        // var pushpinClicked = 
        pin.metadata = {
            title: result.name,
            description: result.location
        };

        Microsoft.Maps.Events.addHandler(pin, 'mouseover', function (e) {
            e.target.setOptions({ 
                subTitle: 'Melbourne',
            });
        });
    
        Microsoft.Maps.Events.addHandler(pin, 'mouseout', function (e) {
            e.target.setOptions({ 
                subTitle: '',
            });
        });
        
        Microsoft.Maps.Events.addHandler(pin, 'click', (e) => {
            //Make sure the infobox has metadata to display.
            console.log(e.target.metadata);
            if (e.target.metadata) {
                //Set the infobox options with the metadata of the pushpin.
                infobox.setOptions({
                    location: e.target.getLocation(),
                    title: e.target.metadata.title,
                    description: e.target.metadata.description,
                    visible: true
                });        
                
            }
        });

        //Add the pushpin to the map
        map.entities.push(pin);

}

function GetMap() {
    var map = new Microsoft.Maps.Map('#map', {
        center: new Microsoft.Maps.Location(-37.818555, 144.959076),
        zoom: 17
    });

    creatInfoBox(map);3
    results.forEach((result, index) => {
        addPin(map, result, index);
    });

    
} 


