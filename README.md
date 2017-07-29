# Flight Management

## Application
The goal of this application is to manage an airport's information. The application manages flights, arrivals, departures and flight controllers, each one with its specific properties.

### Flights
A flight can be added in the home screen. Its properties are: code (unique), carrier, departing and destination airports, days of the week and departure and arrival times. 

The FLIGHTS tab shows the last 10 flights added to the database, and if a flight is selected on the table or has its code searched, detailed info is shown. The detailed info also includes a map with the localization of the departing and destination airports, and a list of the arrivals and departures that happened in the past week. In this page it is also possible to add departures or arrivals.

### Arrivals and Departures
Arrivals and Departures can be added for each flight. They are independent and can be added in the flight details page. Their properties are date, time and lane, and they are connected with one flight and one or more controllers. An arrival/departure must be unique for a flight, I consider an arrival/departure unique when it is at least 12 hours away from another arrival/departure.

On the flight details page it is possible to see the arrivals and departures for the flight in the past week. All arrivals and departures (for all fligts) are listed under the ARRIVALS and DEPARTURES tabs respectively.

### Controllers
Controllers are persons that are linked to arrivals and departures. They are listed and can be added under the CONTROLLERS tab. The controller's properties are code, name, surname and if the controller is busy or not. One controller can be assigned to only one arrival or departure, but an arrival or departure can have multiple controllers assigned to it. A new controller can be added to the database in the CONTROLLERS tab.

## Development process
I've decided to implement the application using the MEAN Stack. Development decisions, libraries used and general comments are listed below.

### Data structure
For the persistance layer, I've created a MongoDB database called airports, which contains four collections: flights, arrivals, departures and controllers.
The schema for an object of each collection can be seen on the model files, under app/models.

To run this application a live MongoDB instance is needed, the url for it can be specified in the file `config/db.js`.

### External libraries
In order to improve user experience and style the application, I used the AngularJS Material external libary. This library is defined on its website as follows:

>AngularJS Material is both a UI Component framework and a reference implementation of Google's Material Design Specification. This project provides a set of reusable, well-tested, and accessible UI components based on Material Design.

Since this library is widely used and tested, I found no drawbacks at using it. I find that even though it is important to know how develop solutions from scratch, sometimes is really important to know when and how to use open source libraries.

For the maps I've used the Google Visualization API, which is a great API for data visualization. It is in pure JS and straightforward to use.

## Dummy data
The dummy data was generated using the tool [Mockaroo](http://www.mockaroo.com). 
It contains 200 flights, 500 arrivals, 500 departures and 50 controllers. The airports were extracted from Wikipedia, on the list of biggest airports in europe.
Even though the data fits well the structure, the times are really random and don't make sense in real flight scenarios.

It was not possible to ensure the uniqueness of the controller on the arrivals and departures dummy data generator, so the dummy data contains controllers assigned to multiple arrivals/departures, even though the application doesn't allow it when those are created using the UI. This should not be a problem since the purpose of the dummy data is only to provide easy way to visualize the application better and to make easier to test inclusions that require data to be in the database already.

To import the dummy data, the following commands can be run:  

`mongoimport --db airport --collection flights --file flights.json --jsonArray`  
`mongoimport --db airport --collection arrivals --file arrivals.json --jsonArray`  
`mongoimport --db airport --collection departures --file departures.json --jsonArray`  
`mongoimport --db airport --collection controllers --file controllers.json --jsonArray`  

In order to facilitate this process I've created a custom shellscript located in `scripts/import_dummy.sh`

Free Controllers codes in the dummy data:
`B48, L80, X81, C49, P79, Z66, F00, N27, X80 ...`