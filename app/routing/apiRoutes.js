// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var peopleData = require("../data/companion");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/companion", function(req, res) {
    res.json(peopleData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
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
        console.log(peopleData[matchIndex])
        res.send(peopleData[matchIndex]);
    });
  app.post("/api/companion", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
    
    var answersArray =[];
    for(var i =0;i<req.body.answers.length;i++)
        answersArray.push(parseInt(req.body.answers[i]));

    var newCompanion = {name:req.body.name,
                        photoURL:req.body.photoURL,
                        answers:answersArray};

    peopleData.push(newCompanion);
    res.json(true); 
  });

};
