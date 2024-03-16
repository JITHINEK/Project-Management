const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.hashData = async (data) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(data, salt);
        return hash;
    } catch (error) {
        console.error("Bcrypt:: Failed to hash data", error);
        throw error; // Re-throw the error for the caller to handle
    }
}

exports.compareData = async (data, hash) => {
    try {
        return await bcrypt.compare(data, hash);
    } catch (error) {
        console.error("Bcrypt:: Failed to compare hash data", error);
        throw error; // Re-throw the error for the caller to handle
    }
}
