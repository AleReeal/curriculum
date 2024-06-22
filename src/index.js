const express = require("express")
const ejs = require("ejs")
const path = require('path')
const db = require('./funzioni/database.js')
const app = express()

//Funzioni

app.use(express.static(__dirname))
app.set("view engine", "ejs")

app.get("/", (req, res)=>{
    // Ti reindirizza sulla home
    res.redirect("/home") 
}) 

app.get("/home", async (req, res)=>{

    // Verifica che il sito corrente sia alessandrore.it (c'è un altro sito che hosta la stessa applicazione)
    // Nel caso non lo rimanda l'utente sul sito originale
    const currentUrl = req.get('host');
    const targetUrl = 'alessandrore.it';

    // Commentarlo per debugging locale
    /*if (currentUrl != targetUrl) {
        return res.redirect('https://alessandrore.it');
    }*/
    //

    // Aggiorna in tempo reale la mia età (anni)
    const birthday = new Date("2005-08-06")
    let ageDifMs = Date.now() - birthday;
    let ageDate = new Date(ageDifMs);
    let anni = Math.abs(ageDate.getUTCFullYear() - 1970);
    //
    
    // Esegue la query
    const rows = await db.querySelect()
    //

    //console.table(rows)

    const livelli = [[],[],[]]

    rows.forEach(e=>{
        switch(e.livello){
            case 'Principiante':
                livelli[0].push(e)
                break;
            case 'Intermedio':
                livelli[1].push(e)
                break;
            case 'Avanzato':
                livelli[2].push(e)
                break;
        }
    })

    const arrayLungo = 0
    for(let i = 0; i < 3; i++){
        let b = livelli[i].length
        if(livelli[arrayLungo].length < b){
            arrayLungo=i
        }
    }

    console.log(arrayLungo)

    console.log(livelli)
    res.render("home", { anni: anni, competenze: livelli, max: livelli[arrayLungo].length})
})

app.get("/portfolio", (req,res)=>{
    res.render("portfolio")
})

app.get("/contact", (req,res)=>{ 
    res.render("contact")
})

app.get("/docs", (req,res)=>{
    res.render("docs")
})

app.get("/privacy", (req, res)=>{
    res.render("privacy")
})



app.listen(80)