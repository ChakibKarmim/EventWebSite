const express = require('express')
const app = express()
const router = express.Router()
const port = 3000
app.use(express.static("public"))
app.use(express.json())
const uuid = require('uuid')
//import des librairies pour la base de donnée
const pg = require('pg');
const dotenv = require("dotenv");

let events = []
let persons = []
let manches = []

app.get('/message', ( req , res) => {
    res.send('This message is displayed on the path /message on the port ' + port)
})

app.get('/', ( req , res) => {
    res.send('Hello world on the default path /..')
})

app.get("/api/events", (req, res)=>{
    const sql="SELECT *,TO_CHAR(date, 'mm/dd/yyyy') as planning_date  FROM plannings";
    pgClient.query(sql,(err,res)=>{
        if(err)console.log("Echec d'affichage de la table users'");
        else{
            console.log("Affichage de la table users");
            events = res.rows
        }
        pgClient.end;
    });
    res.send(events)
});

app.get("/api/persons", (req, res)=>{
    const sql="SELECT * FROM users";
    pgClient.query(sql,(err,res)=>{
        if(err)console.log("Echec d'affichage de la table users'");
        else{
            console.log("Affichage de la table users");
            persons = res.rows
        }
        pgClient.end;
    });
    res.send(persons)
});

app.get("/api/manche", (req, res)=>{
    const sql="SELECT * FROM manches";
    pgClient.query(sql,(err,res)=>{
        if(err)console.log("Echec d'affichage de la table users'");
        else{
            console.log("Affichage de la table users");
            manches = res.rows
        }
        pgClient.end;
    });
    res.send(manches)
});

app.post("/api/events", (req, res)=>{
    const uniqueRandomID = uuid.v4();
    const str_id = "\'"+uniqueRandomID+"\'"
    console.log( str_id  + " " + req.body.name + " " + req.body.date )
    const sql="INSERT INTO plannings VALUES ("+str_id+",\'"+req.body.name+"\',\'"+req.body.date+"\')";
    pgClient.query(sql,(err,res)=>{
        if(err)console.log("database or query error'");
        else{
            console.log("planning added");
            events = res.rows
        }
        pgClient.end;
    });

    res.send(events)
});

app.post("/api/persons", (req, res)=>{
    const uniqueRandomID = uuid.v4();
    const str_id = "\'"+uniqueRandomID+"\'"
    const sql="INSERT INTO users VALUES ("+str_id+",\'"+req.body.first_name+"\',\'"+req.body.last_name+"\',\'"+req.body.password+"\')";

    pgClient.query(sql,(err,res)=>{
        if(err)
        {
            console.log("database or syntaxe error");
            console.log(err.message)
        }
        else{
            console.log("userd added");
            persons = res.rows
        }
        pgClient.end;
    });
    res.send(persons)
});

app.delete("/api/events/:id", (req, res) => {
    const id_to_delete = "\'" + req.params.id + "\'"
    const sql="delete from plannings where id = "+ id_to_delete +""
    pgClient.query(sql,(err,res)=>{
        if(err)console.log("database or query error'");
        else{
            console.log("planning deleted");
            events = res.rows
        }
        pgClient.end;
    });
    events = events.filter(event => event.id !== req.params.id);
    res.send(events);
});

app.listen(port , () => {
    console.log(`App listening on port ${port}`)
})





//Initialisation de dotenv permettant la lecture en local dans le fichier .env
dotenv.config();
console.log("connecting to", process.env.POSTGRESQL_ADDON_URI);
//
// //Initialisation de la config de la base de données
const pgClient = new pg.Client(process.env.POSTGRESQL_ADDON_URI);
// //Connection à la base de données
pgClient.connect();

pgClient.query('SELECT * FROM users', (err, res)=>{
    if(!err){
        console.log("done");
    } else {
        console.log("Impossible d'afficher les donnees");
        pgClient.end;
    }
})