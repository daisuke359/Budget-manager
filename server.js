const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());

const transactions = require('./routes/transactions');
const PORT = 5000;
//password: daisuke1107
const MONGO_URI = 'mongodb+srv://daisuke:daisuke1107@cluster0.pnq7m.mongodb.net/expensetrackapp?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB connected: ' + conn.connection.host);
    } catch (error) {
        console.log('Error: ' + error.message);
        process.exit(1);
    }
}

connectDB();


app.use('/transactions', transactions);



app.listen(PORT, console.log('Server running in ' + PORT));