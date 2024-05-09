const express = require("express")
const ejs = require("ejs")
const app = express()

//Funzioni

app.use(express.static(__dirname))
app.set("view engine", "ejs")

app.get("/", (req, res)=>{
    res.redirect("/home")
})

app.get("/home", (req, res)=>{
    res.render("home", { competenze: "SQL"})
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