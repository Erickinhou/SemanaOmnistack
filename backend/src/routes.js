const express = require('express')
const OngsController = require('./controllers/OngController')
const IncidentsController = require('./controllers/IncidentController') 
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.get('/ongs', OngsController.index)
routes.post('/ongs', OngsController.create );


routes.post('/session', SessionController.create );


routes.post('/incidents', IncidentsController.create ); 
routes.delete('/incidents/:id', IncidentsController.delete ); 
routes.get('/incidents', IncidentsController.index ); 
/* pra acessar a aplicação inicial, só um barra */

routes.get('/profile', ProfileController.index)

module.exports = routes