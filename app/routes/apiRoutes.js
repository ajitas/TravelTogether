// ===============================================================================
// LOAD DATA
// We are linking our routes to "data" source.
// These data sources hold array of information on people and their survey answers
// ===============================================================================

var peopleData = require("../data/companion");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/comapnion... they are shown a JSON of the data)
  // ---------------------------------------------------------------------------

  app.get("/api/companion", function(req, res) {
    res.json(peopleData);
  });

  // The below get request is handles matching the answers given by the user with the
  // previously stored answers of other people and return the element that has closest
  // match with the user's answers. Since this request is made after post request, the
  // current user's data is already in peopleData at last index
  // ---------------------------------------------------------------------------
  app.get("/api/match",function(req,res){
      var minMatchFactor = Number.MAX_VALUE;
      var matchIndex = -1;

        //loop through the array of objects and match the last object's answers with all other
        //objects to find the closest match
        for(var i =0;i<peopleData.length-1;i++){

            //we get the sum of absolute differences between two users' answers for each question
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
            
            //get the minimum matchFactor
            if(minMatchFactor >= matchFactor){
                minMatchFactor = matchFactor;
                matchIndex = i;
            }
        }
        //return the response with the closest matched object from the array
        res.send(peopleData[matchIndex]);
    });

  // API POST Requests
  // Below code handles when users submits his information with the survey answers
  // ---------------------------------------------------------------------------
  app.post("/api/companion", function(req, res) {
    // "server" will respond to requests and lets users know if the request has been completed successfully or not.
    // It will do this by sending out the value "true" after pushing the new data in the companion's array
    // req.body is available since we're using the body-parser middleware
    
    var answersArray =[];

    //since req.body.answers is an array of strings, we convert it into integer and push in answersArray
    for(var i =0;i<req.body.answers.length;i++)
        answersArray.push(parseInt(req.body.answers[i]));

    //create a new object with the name, photoURl and the answers array we just created
    var newCompanion = {name:req.body.name,
                        photoURL:req.body.photoURL,
                        answers:answersArray};

    //push the new object in peopleData array, which is an array of objects containing people's info and answers
    peopleData.push(newCompanion);
    res.json(true); 
  });

};
