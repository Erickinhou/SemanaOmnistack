const generateId = require('../utils/generateUniqueId')
const connection = require('../database/connection')

module.exports = {
    async index (request, response){
        const ongs = await connection('ongs').select('*')
        return response.json(ongs)
    },

    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body /* a função precisa se async pq o retorno da função n pode depender da inserção de dados */
        const id = generateId()

        await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
        })  

        return response.json({id})
    }
}