const AgendaModel = require("../Model/Agenda");
const { Op } = require("sequelize");
const { min, startOfWeek, endOfWeek } = require("date-fns");

class AgendaController {

    async list() {
        let status = 200;
        let res;
        const r = await AgendaModel.findAll().catch(error => {
            status = 422;
            res = error;
        });
        if (r)
            res = r

        return { "status": 200, data: res };
    }

    async beforeAdd(req) {
        try {
            const chechWeek = await this.selectWeek(req.body.date, req.body.phone);

            const dates = chechWeek.map(date => new Date(date.dataValues.date));
            const lowerDate = min(dates);

            return { "status": 200, "data": [lowerDate] || [] };
        } catch (err) {
            return { "status": 422, "data": err };
        }
    }

    async add(req) {
        let status = 201;
        let res;

        const dateTimeExists = await this.selectDateTime(req.body.phone, req.body.date, req.body.time);
        if (dateTimeExists.length)
            return { "status": 401, "data": "Não pode agendar na mesma data" };

        const r = await AgendaModel.create({
            name: req.body.name,
            phone: req.body.phone,
            service: req.body.service,
            date: req.body.date,
            time: req.body.time
        }).catch(error => {
            status = 422;
            res = error
        });
        if (r)
            res = r
        return { "status": status, "data": res };
    }

    async select(phone) {
        let status = 200;
        let res;

        const r = await AgendaModel.findAll({
            where: {
                phone: phone
            }
        }).catch(error => {
            status = 422;
            res = error
        });
        if (r)
            res = r

        return { "status": status, data: res };
    }

    async selectDateTime(phone, date, time) {
        const r = await AgendaModel.findAll({
            where: {
                phone: phone,
                date: date,
                time: time
            }
        });

        return r;
    }

    async selectWeek(date, phone) {
        const sunday = startOfWeek(new Date(date));
        const saturday = endOfWeek(new Date(date));
        //console.log("phone", phone == '')
        const chechWeek = await AgendaModel.findAll({
            where: {
                phone: phone,
                date: {
                    [Op.between]: [sunday, saturday],
                }
            }
        })

        return chechWeek;
    }

    async selectAllInWeek(date) {
        let status = 200;
        let res;

        const sunday = startOfWeek(new Date(date));
        const saturday = endOfWeek(new Date(date));

        const r = await AgendaModel.findAll({
            where: {
                date: {
                    [Op.between]: [sunday, saturday],
                }
            }
        }).catch(error => {
            status = 422;
            res = error
        });
        if (r)
            res = r
        return { "status": status, "data": res };
    }

    async update(req, id) {
        let status = 200;
        let res;
        const r = await AgendaModel.update({
            name: req.body.name,
            phone: req.body.phone,
            service: req.body.service,
            date: req.body.date,
            time: req.body.time
        }, {
            where: {
                idAgenda: id
            }
        }).catch(error => {
            status = 422;
            res = error
        });
        if (r) {
            res = await AgendaModel.findByPk(id).catch(error => {
                status = 422;
                res = error
            });
        }

        return { "status": status, data: res };
    }

    async delete(id) {
        let status = 204;
        let res;
        await AgendaModel.destroy({
            where: {
                idAgenda: id
            }
        }).catch(error => {
            status = 422;
            res = error
        });
        return { "status": status, data: res };
    }
}



module.exports = AgendaController;