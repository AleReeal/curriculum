const express = require("express")
const ejs = require("ejs")
const sql = require("better-sqlite3")
const Database = require("better-sqlite3/lib/database")
const app = express()

//Funzioni

function eseguiSelect(query){
    const db = new Database('./database/sito.db')
    const risultato = db.prepare(query).all()
    return risultato
}

function ordinaTabella(ra){
    const raw = ra
    const consegnato = []
    let cont = 0
    while(raw.lenght>0){
        let num = raw.findIndex(ele => ele.valore == cont)
        consegnato.push(raw[num])
        raw = raw.toSpliced(num, 1)
        if(cont < 2){
            cont++
        }
        else{
            cont = 0
        }
        raw=[{competenza:"ciao"}]
    }
    return raw
    }

app.use(express.static(__dirname))
app.set("view engine", "ejs")

app.get("/", (req, res)=>{
    res.redirect("/home")
})

app.get("/home", (req, res)=>{
    const risultato = ordinaTabella(eseguiSelect("SELECT * FROM competenze;"))
    res.render("home", { competenze: risultato})
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