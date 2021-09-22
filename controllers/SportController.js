const express = require ("express");
const api= express.Router();

var axios = require("axios").default;
api.get('/sports',(req,res)=>{

var options = {
  method: 'GET',
  url: 'https://free-nba.p.rapidapi.com/games',
  params: {team_ids: '5', Seasons: '5'},
  headers: {
    'x-rapidapi-host': 'free-nba.p.rapidapi.com',
    'x-rapidapi-key': 'f9665f15ebmsh3862492d74f19adp11b5a4jsn53320eeae3ea'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
  res.render('sports',{data: response.data,title:"NBA"});
}).catch(function (error) {
	console.error(error);
});
});

module.exports=api;