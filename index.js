const express = require('express')
require('dotenv/config')
const router = require('./app/router');
const app = express();
const games = require('./data/games.json');
const port = process.env.PORT || 3000


// On dit au serveur express que l'on utilise le moteur de vue EJS et que nos vues se trouve dans le repertoire src/views
app.set("view engine", "ejs");
app.set("views", "./app/views");

//variables en local 
app.locals.games = games;
app.locals.game = null;
// On dit a express de delivrer (cree une route) pour chacun des fichiers presents dans le dossier public
app.use(express.static('./public'))


app.use(router)

app.use((req, res) => {
    res.status(404).render('404')
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})