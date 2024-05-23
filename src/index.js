const express = require("express")
const ejs = require("ejs")
const path = require('path')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()

// Configura i dettagli della connessione
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3333,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'sito' 
});

//Funzioni

app.use(express.static(__dirname))
app.set("view engine", "ejs")

app.get("/", (req, res)=>{
    // Ti reindirizza sulla home
    res.redirect("/home") 
}) 

app.get("/home", (req, res)=>{

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
    
    const a = db.query(
      'SELECT * FROM conoscenze;',
      function (err, results, fields) {
        console.log(results)
        return results
      }
    );

    res.render("home", { anni: anni, competenze: 'mysql'})}
)

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