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

    if (currentUrl != targetUrl) {
        return res.redirect('https://alessandrore.it');
    }
    //

    // Aggiorna in tempo reale la mia età (anni)
    const birthday = new Date("2005-08-06")
    let ageDifMs = Date.now() - birthday;
    let ageDate = new Date(ageDifMs);
    let anni = Math.abs(ageDate.getUTCFullYear() - 1970);
    //
    
    const rows = await db.querySelect()

    const livelli = [[[]]]

    contatori = [0,0,0]

    rows.forEach(e=>{
        switch(rows.livello){
            case 'Principiante':
                livelli[contatori[0]].push(e)
                break;
            case 'Intermedio':
                livelli[contatori[1]].push(e)
                break;
            case 'Avanzato':
                livelli[contatori[2]].push(e)
                break;
        }
    })

    res.render("home", { anni: anni, competenze: 'sql'})
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