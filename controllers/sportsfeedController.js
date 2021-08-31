var axios = require("axios").default;
const feed = require('../models/database');
const get_sports_feed = (req,res) =>{
    res.render('sports', {title: 'sports feed'});
    var axios = require("axios").default;

    var options = {
      method: 'GET',
      url: 'https://livescore6.p.rapidapi.com/matches/v2/detail',
      params: {Eid: '315868', Category: 'soccer', LiveTable: 'false'},
      headers: {
        'x-rapidapi-host': 'livescore6.p.rapidapi.com',
        'x-rapidapi-key': 'f9665f15ebmsh3862492d74f19adp11b5a4jsn53320eeae3ea'
      }
    };
    
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

module.exports = {get_sports_feed}