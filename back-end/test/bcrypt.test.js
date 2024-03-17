const { hashData, compareData } = require('../utils/bcrypt');

describe('Test hashing function', () => {
    it('should hash and compare string', async () => {
        const data = "pass00";
        const hash = await hashData(data);
        console.log("hash: ", hash)
        expect(await compareData(data, hash)).toBe(true);
    });
});

// {
//     "scripts": {
//         "dev": "cross-env BACKEND_ENV=development nodemon back-end/index.js & cross-env FRONTEND_ENV=development cd front-end && npm start"
//     }
// }
