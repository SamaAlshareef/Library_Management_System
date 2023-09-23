import router from "./routes/router.js";
import mysql from "mysql";
import express from "express"; //Import the express dependency
import bodyParser from 'body-parser';
const app = express(); //Instantiate an express app, the main work horse of this server
const port = 5000; //Save the port number where your server will be listening

export const getSingleConnection = async () => {
  console.log("********* Getting new connection *****************");
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "library_management",
  });
};

export const executeSingleConnection = async (query) => {
  console.log("SQL QUERY:", query);
  let connection;
  try {
    connection = await getSingleConnection();
    const result = await connection.query(query,function (err, result, fields) {
            if (err) throw err;
            console.log(result);
          })
    connection.end();
    return Promise.resolve(result);
  } catch (err) {
    console.log("errr ", err);
    if (connection) {
      connection.end();
    }
    return Promise.reject(err);
  }
};

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use("/api/", router);
// app.use((req, res, next) => {
//     next(httpError(404, 'Route does not exist (beta)', 'Are you lost?', 'NOT-FOUND-404'));
//   });

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});
