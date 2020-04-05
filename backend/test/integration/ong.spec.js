const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.down('20200325005649_create_ong_2.js')
        await connection.migrate.down('20200324230611_incidents.js')
        await connection.migrate.up('20200325005649_create_ong_2.js')
        await connection.migrate.up('20200324230611_incidents.js')
    })

    afterAll(async ()=>{
        await connection.destroy()
    })

    it('should be able to create a new ong', async () => {
        const response = await request(app)
            .post('/ongs')
            .send(
                {
                    name: "APAD",
                    email: "contato@gmail.com",
                    whatsapp: "4700000000",
                    city: "Rio do Sul",
                    uf: "SC"
                }
            )
        console.log(response.body)
    })
})