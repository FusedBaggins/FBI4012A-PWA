import { Request, Response } from "express";

// Local
import Sprint from "../models/sprint";
import History from "../models/history";
import Squad from "../models/squad";


export default {
    async list(req: Request, res: Response): Promise<any> {
        const id: number = parseInt(req.params.id);
        let sprint = await Sprint.findByPk(id, { include: [{ model: Squad, as: 'squads' }] });
        if (sprint) {
            //let rankings = await History.findAll({ where: { sprintId: id }})
            return res.status(200).json(sprint.squads);
        }
        return res.status(404).json({});

    },
    detail(req: Request, res: Response): any {
        return res.status(200).json({});
    },
    create(req: Request, res: Response): any {
        return res.status(200).json({});
    },
    edit(req: Request, res: Response): any {
        return res.status(200).json({});
    },
    delete(req: Request, res: Response): any {
        return res.status(200).json({});
    }
}