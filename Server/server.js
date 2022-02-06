const app = require("./service");
const agendamento = require("../Routes/agendamento");
//const cors = require('cors');

/*******************************/
/* const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions)); */
/*******************************/


app.listen(8081, () => {
    console.log("Server On in port 8081 at", new Date().toLocaleString());
});