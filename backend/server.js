    const express = require('express');
    require('dotenv').config();
    const chats   = require('./data/data')
    const cors = require('cors');
    const connectDB = require('./config/db');
    const app = express();
    
    const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
    
    connectDB()
    app.use(cors())
    app.use(express.json());

    app.use('/api/user', userRoutes)
    
    app.use(notFound);
    app.use(errorHandler)



    const PORT = process.env.PORT || 5000

    app.listen(5000, () => {
        console.log(`Server is running on ${PORT}`);
    })