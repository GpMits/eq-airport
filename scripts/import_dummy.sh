mongoimport --db airport --collection flights --file flights.json --jsonArray;
mongoimport --db airport --collection arrivals --file arrivals.json --jsonArray;
mongoimport --db airport --collection departures --file departures.json --jsonArray;
mongoimport --db airport --collection controllers --file controllers.json --jsonArray;