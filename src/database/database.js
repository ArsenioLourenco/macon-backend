const mssql = require('mssql');

//Config Server 255

/*let configDB = {
    server: "10.5.2.225",
    database: "folha_de_rosto",
    user: "sa",
    password: "google.2020",
    port: 1433,
}*/

//Config Server 6
let configDB = {
    server: "192.168.40.5",
    database: "folha_de_rosto",
    user: "sa",
    password: "google.2021",
    port: 1433,
}

let Connection = new mssql.ConnectionPool(configDB);
let Request = new mssql.Request(Connection);

function database(Query) {
    return new Promise(function(resolve, reject) {
        Connection.connect(function(err) {
            if (err) console.log(err);

            Request.query(Query, function(err, data) {

                if (err) console.log(err);
                //console.log(data.recordset[0]);
                //console.log(data.rowsAffected[0]);
                //console.log(data.recordset[0]);
                resolve(data);
            });
        });
    });
}

module.exports = database;