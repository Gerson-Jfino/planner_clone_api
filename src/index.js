const express = require('express');
const planRoutes = require('./v1/routes/planRoutes');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use('/api/v1/plans', planRoutes);


app.listen(PORT, () => {
    console.log(`APP RUNING ON PORT ${PORT}`);
})