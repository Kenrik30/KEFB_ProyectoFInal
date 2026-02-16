const express = require('express');
const connectDB = require('./config/mongoConfig');
const cors = require('cors');
const app = express();
const { createAdmin } = require('./libs/initialSetup');
// 1. Conectar BD
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/departments', require('./routes/departmentsRoutes'));
app.use('/api/beaches', require('./routes/beachRoutes'));
app.use('/api/mountains', require('./routes/mountainRoutes'));
app.use('/api/night', require('./routes/nightRoutes'));
app.use('/api/volcanos', require('./routes/volcanosRoutes'));
app.use('/api/parks', require('./routes/parkRoutes'));
app.use('/api/foods', require('./routes/foodRoutes'));
app.use('/api/towns', require('./routes/townRoutes'));
createAdmin();
app.get('/api/status', (req, res) => {
    res.json({ status: 'conectado' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://127.0.0.1:${PORT}`);
});
