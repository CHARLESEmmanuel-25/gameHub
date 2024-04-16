let compteur = 0;
const loggerMiddleware = (req,res)=>
{
    let counteur = compteur++;
    console.log(`requette numero ${counteur}, heure : ${Date().toString()}, adresse IP: ${req.ip}`);

    next();
}

module.exports = loggerMiddleware;