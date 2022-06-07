import { Request, Response } from "express";
import SprintConfiguration from "../models/sprint-configuration";

export default {
    async list(req: Request, res: Response): Promise<any> {
        let configurations = await SprintConfiguration.findAll({});
        return res.status(200).json(configurations);
    },
    async detail(req: Request, res: Response): Promise<any> {
        let configuration = await SprintConfiguration.findByPk(parseInt(req.params.id));
        if (configuration) return res.status(200).json(configuration);
        return res.status(404).json({});
    },
    async create(req: Request, res: Response): Promise<any> {
        const obj: any = req.body;
        let configuration = await SprintConfiguration.create(obj);
        return res.status(200).json(configuration);
    },
    async edit(req: Request, res: Response): Promise<any> {
        const id: any = req.params.id;
        let obj: any = req.body;
        delete obj.id;

        let configuration = await SprintConfiguration.update(obj, { where: { id: id } });

        if (configuration[0]) return res.status(200).json({});
        return res.status(404).json({});
    },
    delete(req: Request, res: Response): any {
        return res.status(200).json({});
    }
}