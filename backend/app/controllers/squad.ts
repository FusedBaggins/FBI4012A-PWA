import { Request, Response } from "express";
import Squad from "../models/squad";

export default {
    async list(req: Request, res: Response): Promise<any> {
        let squads = await Squad.findAll({});
        return res.status(200).json(squads);
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