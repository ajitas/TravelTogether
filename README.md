# TravelTogether

## About
TravelTogether is a full-stack web application using node.js and express that lets user take a survey and finds a travel companion for them whose survey answers are closest match with his answers.

## Deployed Link
[TravelTogether-App](https://travel-together-1.herokuapp.com)

## Application Preview

### Home Page
![TravelTogether-Home](app/public/images/travel-together-home.gif)

### Survey Page
![TravelTogether-Survey](app/public/images/travel-together-survey.png)

### Survey Result
![TravelTogether-Result](app/public/images/travel-together-result.png)

### API Data
![TravelTogether-API](app/public/images/travel-together-api.png)

## Technologies used
1. Node.js
2. Express

## API Data
```
[
    {
      name: "Leonardo DiCaprio",
      photoURL:"http://specials-images.forbesimg.com/imageserve/558c0172e4b0425fd034f8ba/280x425.jpg?fit=scale&background=000000",
      answers:[1,1,2,2,3,3,4,4,5,5]
    },
    {
        name: "Celine Dion",
        photoURL:"https://s3.amazonaws.com/busites_www/celinedion/content/articles/16-0906.jpg",
        answers:[1,1,2,2,3,3,4,4,4,3]
    }
];
```
API Data is an object array wherein each object consists of a name, photoURL and an array containing answers to the survey questions. It can be further utilized by querying on a person's name and getting back their answers/preferences.

## Node Packages used
1. express
    * usage
    ```require("express")```
    * It is a fast, unopinionated, minimalist web framework for node.
    * For more information: [express](https://expressjs.com)

2. path
    * usage
    ```require("path")```
    * Comes with node. The path module provides utilities for working with file and directory paths.
    * For more information: [path](https://nodejs.org/api/path.html)

3. body-parser
    * usage
    ```require("body-parser")```
    * Node.js body parsing middleware.Parses incoming request bodies in a middleware before handlers, available under the req.body property.
    * For more information: [body-parser](https://www.npmjs.com/package/body-parser)

## Execution steps on local machine
1. Make sure node is installed on your machine. You can visit the website [Node Installation](http://blog.teamtreehouse.com/install-node-js-npm-mac) for instructions.
2. Download/Clone the respository.
3. On terminal, go inside TravelTogether folder and type npm install. This will install all the dependencies required to run the application mentioned in package.json.
4. Inside TravelTogether folder on terminal, type "node server.js" on terminal. This will start the server.
5. Open the browser and type "localhost:8080". This will start executing the client part of the application. Since we are not storing the data in any database, the data user enters will only be available till the server is running (when user exits the server execution from terminal).

## Code snippets

### Server Side
```
require("./app/routes/apiRoutes")(app);
require("./app/routes/htmlRoutes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
```
Here, we point our server to a series of "route" files. These routes give our server a "map" of how to respond when users visit or request data from various URLs. app.listen() actually starts the server.

```
app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});
```
These are routes that serves up html pages to the client based upon the URL the client visits.

```
 app.get("/api/companion", function(req, res) {
    res.json(peopleData);
});

app.post("/api/companion", function(req, res) {
    var answersArray =[];
    for(var i =0;i<req.body.answers.length;i++)
        answersArray.push(parseInt(req.body.answers[i]));

    var newCompanion = {name:req.body.name,
                        photoURL:req.body.photoURL,
                        answers:answersArray};

    peopleData.push(newCompanion);
    res.json(true); 
  });
```
In the above get request, when client requests for all users' information with a get request, server responds with the array of objects that contain information of all users.
In the post request, when client fills the survey form and submits it with a post request, server stores the new user's information in the array of all users' information as an object and returns true to the client

```
app.get("/api/match",function(req,res){
      var minMatchFactor = Number.MAX_VALUE;
      var matchIndex = -1;

        for(var i =0;i<peopleData.length-1;i++){
            matchFactor = 
            Math.abs(peopleData[peopleData.length-1].answers[0] - peopleData[i].answers[0])+
            Math.abs(peopleData[peopleData.length-1].answers[1] - peopleData[i].answers[1])+
            Math.abs(peopleData[peopleData.length-1].answers[2] - peopleData[i].answers[2])+
            Math.abs(peopleData[peopleData.length-1].answers[3] - peopleData[i].answers[3])+
            Math.abs(peopleData[peopleData.length-1].answers[4] - peopleData[i].answers[4])+
            Math.abs(peopleData[peopleData.length-1].answers[5] - peopleData[i].answers[5])+
            Math.abs(peopleData[peopleData.length-1].answers[6] - peopleData[i].answers[6])+
            Math.abs(peopleData[peopleData.length-1].answers[7] - peopleData[i].answers[7])+
            Math.abs(peopleData[peopleData.length-1].answers[8] - peopleData[i].answers[8])+
            Math.abs(peopleData[peopleData.length-1].answers[9] - peopleData[i].answers[9]);

            if(minMatchFactor >= matchFactor){
                minMatchFactor = matchFactor;
                matchIndex = i;
            }
        }
        res.send(peopleData[matchIndex]);
    });
```
In the above code, after the new user's information is stored in the array at server's end. The client sends a get request to the server to send them back information of the user whose answers were closest match with his answers. So server takes the answers of last element in the peopleData array and starts matching it with every elements' answers. It takes the sum of absolute differences between their answers and returns to the client the information of the user who has the least difference.

### Client Side
```
var answersArray = [];
for(var i =0;i<10;i++)
    answersArray.push($("input[name=question"+parseInt(i+1)+"]:checked").val());

var newPerson = {
    name:$("#name").val(),
    photoURL:$("#photo").val(),
    answers:answersArray
};

$.post("/api/companion", newPerson, function(data){

    $.get("/api/match",function(data){
        $("#companionModalLabel").text(data.name);
        $("#companionPicture").attr("alt",data.photoURL);
        $("#companionPicture").attr("src",data.photoURL);
        $("#companionPicture").css("max-height","300px");
    });
});
```
The above client side code pushes all the answers of the survey for the user in answersArray and creates a new object to be sent to the server with a post request. Once the new object is posted to the server, which means his data is tored at server's end, it makes a get request to get the closest match with his answers. Once the server responds to the get request by sending the data of the user whose answers are closest match with the user, we are displaying that information in the modal.

## Learning points
1. Creating a full stack web application.
2. Learning how the server and client interact with requests and responses.
3. How the to create a server and how it starts listening for the clients' requests on a particular port.
4. Various types of ajax client requests i.e post,get,put,delete.
5. Sending various types of responses to clients including serving an html page or sending back data as json object.
6. How to query on custom API data using a req.body or req.params


## Author 
* [Ajita Srivastava Github](https://github.com/ajitas)
* [Ajita Srivastava Portfolio](https://ajitas.github.io/Portfolio/)

## License
Standard MIT License


