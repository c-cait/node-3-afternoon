require('dotenv').config();
const {SERVER_PORT, CONNECTION_STRING} = process.env;
const express = require('express');


const massive = require('massive');
const app = express();
const products_controller = require('./products_controller')


massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(dbInstance => {
    app.set("db", dbInstance)
    console.log('db connected')
}).catch(err => console.log(err));

app.use(express.json());

app.post('/api/products', products_controller.create);
app.get('/api/products', products_controller.getAll);
app.get('/api/products/:id', products_controller.getOne);
app.put('/api/products/:id', products_controller.update);
app.delete('/api/products/:id', products_controller.delete);


app.listen(SERVER_PORT, () => console.log(`listening on ${SERVER_PORT}`))