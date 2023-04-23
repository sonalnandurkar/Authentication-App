const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');
const config = require('./config/database');
const authRoutes = require('./routes/auth');
const app = express();

const ports = process.env.PORT || 3000;

var corsOptions = {
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions));

mongoose.connect(config.database);

mongoose.connection.once('open', function(){
   console.log('connection has been made');
}).on('error',function(error){
    console.log('error is:', error);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, DELETE, OPTIONS'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Content-Type, Accept, X-Custom-Header, Authorization'
//   );
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }
//   next();
// });

app.use('/auth', authRoutes);


app.listen(ports, () => console.log(`Listening on port ${ports}`));
