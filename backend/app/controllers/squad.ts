import { Request, Response } from "express";
import Squad from "../models/squad";

export default {
    async list(req: Request, res: Response): Promise<any> {
        let squads = await Squad.findAll({});
        return res.status(200).json(squads);
    },
    async detail(req: Request, res: Response): Promise<any> {
        let squad = await Squad.findByPk(parseInt(req.params.id));
        if (squad) return res.status(200).json(squad);
        return res.status(404).json({});
    },
    async create(req: Request, res: Response): Promise<any> {
        const obj: any = req.body;
        let squad = await Squad.create(obj);
        return res.status(200).json(squad);
    },
    async edit(req: Request, res: Response): Promise<any> {
        const id: any = req.params.id;
        let obj: any = req.body;
        delete obj.id;

        let squad = await Squad.update(obj, { where: { id: id } });

        if (squad[0]) return res.status(200).json({});
        return res.status(404).json({});
    },
    async delete(req: Request, res: Response): Promise<any> {
        const id: any = req.params.id;
        let squad = await Squad.destroy({ where: { id: id } });
        if (squad) return res.status(200).json(squad);

        return res.status(404).json({});
    }
}