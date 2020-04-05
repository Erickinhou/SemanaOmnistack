const knex = require('knex')
const configuration = require('../../knexfile')

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development

const connection = knex(config) /* está fazendo a conexão do bd com o servidor, através das configs salvas no knexfile */

module.exports=connection