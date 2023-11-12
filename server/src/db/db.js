const mongoose = require('mongoose');

module.exports = {
    connect: async (cb) => {
        try {
            await mongoose.connect(process.env.MONGODB_URI, {dbName: process.env.MONGODB_DBNAME});
            console.log('Db connected!');
            cb();
        } catch (err){
            throw new Error(err);
        };
    }
}