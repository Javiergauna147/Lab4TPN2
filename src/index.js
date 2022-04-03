// import app from "./server";
import mysql from "mysql";
import axios from "axios";
import { MongoClient } from "mongodb"


punto5();

function punto5() {
    MongoClient.connect(
            process.env.DATABASE_URI
        )
        .catch(err => {
            console.error(err.stack)
            process.exit(1)
        }).then(async client => {


            console.log("conectado a db mongo")
            const db = client.db("myFirstDatabase");
            const collection = db.collection('pais');

            //punto 5.1
            // console.log(await collection.find({region: "Americas"}).toArray());

            // punto 5.2
            // console.log(await collection.find({region: "Americas", population: {$gt: 100000000}}).toArray());

            // punto 5.3
            // console.log(await collection.find({region: {$ne: "Africa"}}).toArray());
            // punto 5.4
            // console.log(await collection.updateOne({name: "Egypt"}, {$set: {name: "Egipto"}}));
        })
}


// const port = process.env.PORT || 3000;
function parteB() {
    MongoClient.connect(
            process.env.DATABASE_URI
        )
        .catch(err => {
            console.error(err.stack)
            process.exit(1)
        }).then(async client => {


            console.log("conectado a db mongo")
            const db = client.db("myFirstDatabase");
            const collection = db.collection('pais');

            for (let i = 1; i <= 300; i++) {
                axios.get(`https://restcountries.com/v2/callingcode/${i}`).then(res => {
                    let paises = res.data;
                    collection.insertMany(paises);
                }).catch(err => {
                    console.log("error al llamar api: ");
                })
            }
            console.log(await collection.find({}).toArray());
        })
}




function parteA() {
    const sqlConnection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'lab4tp2'
    })


    sqlConnection.connect((err) => {
        if (err) {
            console.log("error connecting: ", err.stack);
            return;
        }
        for (let i = 1; i <= 300; i++) {
            axios.get(`https://restcountries.com/v2/callingcode/${i}`).then(res => {
                let paises = res.data;
                paises.forEach(pais => {
                    guardarPaisEnBD(pais);
                });
            }).catch(err => {
                console.log("error al llamar api: ");
            })
        }
        console.log('connected as id ', sqlConnection.threadId);
    });


    // sqlConnection.end();

    function guardarPaisEnBD(pais) {
        sqlConnection.query(`INSERT INTO pais (codigoPais, nombrePais, capitalPais, region, poblacion, latitud, longitud) VALUES (${parseInt(pais.numericCode)}, '${pais.name.replace('\'', '')}', '${pais.capital.replace('\'', '')}', '${pais.region.replace('\'', '')}', ${pais.population}, ${pais.latlng[0]}, ${pais.latlng[1]})`, function(err, rows, fields) {
            // if (err) throw err;
        });
    }
}