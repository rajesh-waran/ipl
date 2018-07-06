'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/', (req, res) => {
    console.log('REQUSST', req.body);

    if(req.body.queryResult && req.body.queryResult.action == "getLeagueTeam"){
      console.log('FEDDY ', JSON.stringify(req.body));
      let params = req.body.queryResult.parameters;
      let userStorage = req.body.originalDetectIntentRequest.payload.user.userStorage ? JSON.parse(req.body.originalDetectIntentRequest.payload.user.userStorage) : {};
      userStorage.leagueTeam = params.leagueTeam;
      return res.json({
        "fulfillmentText": "This is a text response",
        "fulfillmentMessages": [
          {
            "card": {
              "title": "card title",
              "subtitle": "card text",
              "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
              "buttons": [
                {
                  "text": "button text",
                  "postback": "https://assistant.google.com/"
                }
              ]
            }
          }
        ],
        "source": "example.com",
        "payload": {
          "google": {
            "expectUserResponse": true,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": "this is a simple response"
                  }
                }
              ]
            },
            "userStorage": JSON.stringify(userStorage)
          }
        }
      });


      // let params = req.body.queryResult.parameters;
      // let userStorage = req.body.originalDetectIntentRequest.payload.user.userStorage ? JSON.parse(req.body.originalDetectIntentRequest.payload.user.userStorage) : {};
      // userStorage.leagueTeam = params.leagueTeam;

      // return res.json({
      //   "userStorage": JSON.stringify(userStorage),
      //   "finalResponse": {"speechResponse": {
      //     "textToSpeech": "Its Oh Great. Nice to know that you like "+ params.leagueTeam ,
      //     "ssml":  "<speak> </speak>"
      //   }}
      // });
    } else if(req.body.queryResult && req.body.queryResult.action == "getCountryTeamName"){
      console.log('FEDERER ', JSON.stringify(req.body));
      let params = req.body.queryResult.parameters;
      let userStorage = req.body.originalDetectIntentRequest.payload.user.userStorage ? JSON.parse(req.body.originalDetectIntentRequest.payload.user.userStorage) : {};
      userStorage.countryName = params.countryName;

      return res.json({
        "userStorage": JSON.stringify(userStorage),
        "finalResponse": {"speechResponse": {
          "textToSpeech": "Its "+ params.countryName+" will do it.",
          "ssml": "<speak> </speak>"
        }}
      });
    } else if(req.body.queryResult && req.body.queryResult.action == "bookTicket"){
        console.log('UNIQLO FEDERER ', JSON.stringify(req.body));
        let params = req.body.queryResult.parameters;
        let userStorage = req.body.originalDetectIntentRequest.payload.user.userStorage ? JSON.parse(req.body.originalDetectIntentRequest.payload.user.userStorage) : {};
        userStorage.homeTeam = params.homeTeam;
        userStorage.awayTeam = params.awayTeam;
        return res.json({
          "userStorage": JSON.stringify(userStorage),
          "finalResponse": {"speechResponse": {
            "textToSpeech": "Its "+ params.homeTeam+" vs "+ params.awayTeam ,
            "ssml": "<speak> </speak>"
          }},
          "expectUserResponse": true
        });

        // if(params.noOfTickets >10){
        //   console.log('No Of Tickets ', params.noOfTickets);
        //   return res.json({
        //     "fulfillmentText": "Number of tickets should be below 10",
        //     "fulfillmentMessages": [
        //       {
        //         "text": {
        //           "text": [
        //             "No. of tickets should be below 10"
        //           ]
        //         }
        //       }
        //     ],
        //     "followupEventInput": {
        //       "name": "customNoOfTickets",
        //       "languageCode": "en-US",
        //       "parameters": {
        //         "awayTeam": params.awayTeam,
        //         "homeTeam": params.homeTeam
        //       }
        //     }
        // });
        // } else{
        //   return res.json({
        //     "fulfillmentText": "Have a good time !",
        //     "fulfillmentMessages": [
        //       {
        //         "text": {
        //           "text": [
        //             params.noOfTickets + " Tickets are booked for " + params.homeTeam + " vs " + params.awayTeam
        //           ]
        //         }
        //       }
        //     ]
        //   });
        // }
    } else{
        return res.json({statusCode:200});
    }
});

app.listen(process.env.PORT || 5000, () => console.log('Example app listening on port 3000!'));