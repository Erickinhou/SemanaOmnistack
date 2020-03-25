const connection = require('../database/connection')

module.exports = {

    async index (request, response){
        const {page = 1} /* se n for mandada a pag, o valor padão é 1 */= request.query

        const [count] = await connection('incidents').count() /* conta tds os casos */

        const incidents = await connection('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id')
        .limit(5) /* limita */
        .offset((page-1)*5) /* pula */
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf',
        ])
        response.header('X-total-Count', count['count(*)']) /* n sou o . por causa dos parenteses */
        /* retornou o valor no header */
        return response.json(incidents)
    },
    async create(request, response){
        const {title, description, value} = request.body
        const ong_id = request.headers.authorization;
        
        const [id] = await connection('incidents').insert({
            title, 
            description,
            value,
            ong_id
        })
        return response.json({id}) 
    },

    async delete(request, response){
        const {id} = request.params
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents').select('ong_id').where('id', id).first()
        if (incidents.ong_id !== ong_id){
            return response.status(401).json({ error: 'Operation not permitted.'}) /* status 401 é de não autorizado */
        }

        await connection('incidents').where('id', id).delete()
        return response.status('204').send()  /* 204 é o de sem conteudo */
    }
}