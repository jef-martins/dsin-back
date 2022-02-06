const app = require("./service");
const agendamento = require("../Routes/agendamento");

app.listen(8081, () => {
    console.log("Server On in port 8081 at", new Date().toLocaleString());
});