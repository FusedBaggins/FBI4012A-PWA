import http from 'http';
import express from "express";
import bodyParser from 'body-parser';

import routes from './routes';

class Application {
    server: http.Server;
    express: express.Application;

    constructor() {
        this.express = express();
        this.server = http.createServer(this.express);

        this._setMiddlewares();
        this._setRoutes();
    }

    private _setMiddlewares(): void {
        this.express.use(express.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
    }

    private _setRoutes():void{
        this.express.use(routes);
    }
}

export default new Application().server;