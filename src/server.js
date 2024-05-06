require('dotenv').config();
const express = require('express'); //commonjs - import module express
const configViewEngine = require('./config/viewengine');
const webRoutes = require('./routes/web');
const connection = require('./config/database')

const app = express(); // app express
const port = process.env.PORT || 8888; // port
const hostname = process.env.HOST_NAME;

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data
//config template engine
configViewEngine(app)

// khai baos routes
app.use('/', webRoutes);

//test connection


//simple query
//connection.query(
// 'select * from Users u',
// function (err, results, fields) {
//     console.log(">>>results= ", results); // kết quả trả về
//console.log(">>> fields= ", fields); // thông tin bổ sung(tên các cột, kiểu dữ liệu, ...)
//  }
//);

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})