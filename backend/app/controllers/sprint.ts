import { Request, Response } from "express";

import Squad from "../models/squad";
import Sprint from "../models/sprint";
import History from "../models/history";

export default {
    async list(req: Request, res: Response): Promise<any> {
        let sprints = await Sprint.findAll({});
        return res.status(200).json(sprints);
    },
    async detail(req: Request, res: Response): Promise<any> {
        let sprint = await Sprint.findByPk(parseInt(req.params.id), { include: [{ model: Squad, as: 'squads' }] });
        if (sprint) return res.status(200).json(sprint);
        return res.status(404).json({});
    },
    async create(req: Request, res: Response): Promise<any> {
        let obj: any = req.body;
        let squads: any[] = obj.squads;

        delete obj.id;
        delete obj.squads;

        try {
            let sprint = await Sprint.create(obj);
            await History.bulkCreate(
                squads.map(squad => {
                    return { sprintId: sprint.id, squadId: squad }
                })
            );

            return res.status(204).json({});

        } catch (error) {
            return res.status(400).json(error);
        }
    },
    async edit(req: Request, res: Response): Promise<any> {
        const id: any = req.params.id;
        let obj: any = req.body;
        let squads: any[] = obj.squads;

        delete obj.id;
        delete obj.squads;

        let sprint = await Sprint.update(obj, { where: { id: id } });
        if (sprint[0]) {
            if (squads.length) {
                let histories = await History.findAll({ where: { sprintId: id }, attributes: ['squadId'], raw: true });
                let _create, _inactivate = [];

                histories = histories.map((history: any) => history.squadId);
                _inactivate = histories.filter((history: any) => !squads.includes(history));
                _create = squads.filter(squad => !histories.includes(squad));

                if (_create.length) {
                    await History.bulkCreate(_create.map(squad => ({ squadId: squad, sprintId: id })));
                }
                if (_inactivate.length) {
                    await History.update({ isActive: false }, { where: { sprintId: id, squadId: _inactivate } });
                }

            } else {
                await History.update({ isActive: false }, { where: { sprintId: id } });
            }

            return res.status(204).json({});

        }
        return res.status(404).json({});
    },
    async delete(req: Request, res: Response): Promise<any> {
        const id: any = req.params.id;
        let sprint = await Sprint.destroy({ where: { id: id } });
        if (sprint) return res.status(200).json(sprint);

        return res.status(404).json({});
    },
    async ranking(req: Request, res: Response): Promise<any> {
        const id: number = parseInt(req.params.id);
        let sprint = await Sprint.findByPk(id);
        if (sprint) {
            let rankings = await History.findAll({ where: { sprintId: id, include: [{ model: Squad}] } })
            return res.status(200).json(rankings);
        }
        return res.status(404).json({});
    }
}