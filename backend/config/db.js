const mongoose = require('mongoose');

const connectDB = (app, PORT) => {
    mongoose.connect(process.env.mongooseURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () => console.log(`listening on port ${PORT}`));
    })
    .catch((err) => {
        console.error("err: ",err);
    })
}

module.exports = connectDB;