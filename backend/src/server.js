const express = require('express');
const cors = require('cors');

const presellRoutes = require('./routes/presellRoutes');
const trackingRoutes = require('./routes/trackingRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/presell', presellRoutes);
app.use('/tracking', trackingRoutes);

app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});