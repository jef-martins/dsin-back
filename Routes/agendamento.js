const agendamento = require('../Server/service');
const AgendaController = require('../Controller/AgendaController');
const cors = require('cors');

agendamento.use(cors());

agenda = new AgendaController;

//-----------Rotas-------------//

//list
agendamento.get("/", async(req, res) => {
        const response = await agenda.list();
        res.status(response.status).send(response.data)
    })
    //select
agendamento.get("/:phone", async(req, res) => {
        const response = await agenda.select(req.params.phone);

        res.status(response.status).send(response.data);
    })
    //add
agendamento.post("/", async(req, res) => {
        response = await agenda.add(req);

        res.status(response.status).send(response.data);
    })
    //beforeAdd
agendamento.post("/week", async(req, res) => {
        response = await agenda.beforeAdd(req);

        res.status(response.status).send(response.data);
    })
    //select week
agendamento.get("/week/:date", async(req, res) => {
        response = await agenda.selectAllInWeek(req.params.date, '');

        res.status(response.status).send(response.data);
    })
    //update
agendamento.put("/:id", async(req, res) => {
        const response = await agenda.update(req, req.params.id);
        res.status(response.status).send(response.data);
    })
    //delete
agendamento.delete("/:id", async(req, res) => {
    const response = await agenda.delete(req.params.id);
    console.log(response)
    res.status(response.status).send(response.data);
})

module.exports = agendamento;