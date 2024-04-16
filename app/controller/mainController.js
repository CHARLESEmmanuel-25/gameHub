const games = require('../../data/games.json');
const mainController ={
  home:(req,res)=>{
    res.render('index');
  },

  game:(req,res)=>{
    const gameName = req.params.name;
    //console.log(games);
   const game = games.find((game)=> game.name === gameName);
    res.render('game',{
        games,
        gameName,
        game,
    });
  },
};
module.exports = mainController;