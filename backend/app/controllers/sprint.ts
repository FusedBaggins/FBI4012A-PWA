import { Request, Response } from "express";

export default {
    list(req: Request, res: Response): any {
        return res.status(200).json({});
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