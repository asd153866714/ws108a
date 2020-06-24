var sum = require('../sum')

describe('test sum', () => {
    it('should return the sum of array', () => {
        let result = sum([1,2,3])
        if (result != 6) {
            throw new Error ('Sum error')
        }
    })
})