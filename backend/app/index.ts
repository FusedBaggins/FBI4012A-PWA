import app from "./app";
import * as dotenv from 'dotenv';

dotenv.config({path:`${__dirname}/.env`});
app.listen(process.env.PORT, () => {
    console.log(`{ defaultUrl: http://localhost:${process.env.PORT} }`);
});