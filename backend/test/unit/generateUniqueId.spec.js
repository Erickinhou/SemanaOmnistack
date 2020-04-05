const generateId= require('../../src/utils/generateUniqueId')

describe('Generate Unique ID', ()=>{
    it('shold be a unique ID', ()=> {
        const id = generateId()

        expect(id).toHaveLength(8)
    })
})