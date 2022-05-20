import { Request, Response } from "express";
import Sprint from "../models/sprint";

export default {
    async list(req: Request, res: Response): Promise<any> {
        let sprints = await Sprint.findAll({});
        return res.status(200).json(sprints);
    },
    async detail(req: Request, res: Response): Promise<any> {
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