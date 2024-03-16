const { hashData, compareData } = require('../utils/bcrypt');

describe('Test hashing function', () => {
    it('should hash and compare string', async () => {
        const data = "Data for hashing";
        const hash = await hashData(data);
        console.log("hash: ", hash)
        expect(await compareData(data, hash)).toBe(true);
    });
});
