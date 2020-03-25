const knex = require('knex')
const configuration = require('../../knexfile')

const connection = knex(configuration.development) /* está fazendo a conexão do bd com o servidor, através das configs salvas no knexfile */

module.exports=connection