import { Request, Response } from "express";

// Local
import Sprint from "../models/sprint";
import History from "../models/history";
import Squad from "../models/squad";
import SprintConfiguration from "../models/sprint-configuration";


export default {
    async list(req: Request, res: Response): Promise<any> {
        const id: number = parseInt(req.params.id);
        let sprint = await Sprint.findByPk(id, { include: [{ model: Squad, as: 'squads' }, { model: SprintConfiguration, as: 'sprintConfiguration' }] });
        if (sprint) {
            //let rankings = await History.findAll({ where: { sprintId: id }})
            return res.status(200).json({ squads: sprint.squads, sprintConfiguration: sprint.sprintConfiguration });
        }
        return res.status(404).json({});

    },
    detail(req: Request, res: Response): any {
        return res.status(200).json({});
    },
    create(req: Request, res: Response): any {
        return res.status(200).json({});
    },
    async edit(req: Request, res: Response): Promise<any> {
        const sprintId: number = parseInt(req.params.sprintId);
        const squadId: number = parseInt(req.params.squadId);
        let history = await History.update(req.body, { where: { sprintId: sprintId, squadId: squadId } })
        
        if (history.length) return res.status(204).json({})

        return res.status(204).json({});
    },
    delete(req: Request, res: Response): any {
        return res.status(200).json({});
    }
}