const express = require('express') /* chamei o express no require */
const cors = require('cors')
const routes = require('./routes')

const app= express(); 
app.use(cors());
app.use(express.json())
app.use(routes) 

/* app.get('/', (require, Response) => {
    return Response.send('OLA')
}) */
app.listen(3333)