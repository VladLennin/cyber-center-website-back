import * as process from "process";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import * as cookieParser from 'cookie-parser';

async function start() {
    const PORT = process.env.PORT || 3001

    // const httpsOptions = {
    //     key: fs.readFileSync('/Users/vladlenmarchenko/WebstormProjects/cyber-center/cyber-center-website-back/src/secrets/key.pem'),
    //     cert: fs.readFileSync('/Users/vladlenmarchenko/WebstormProjects/cyber-center/cyber-center-website-back/src/secrets/certificate.pem'),
    // };

    const app = await NestFactory.create(AppModule)

    app.enableCors({
        origin:["http://localhost:3000", "http://10.5.113.113:3000","http://10.5.113.113:19000", "http://localhost:19006"],
        // origin: true,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 200,
    });


    // app.useGlobalPipes(new ValidationPipe())
    app.setGlobalPrefix('api');
    app.use(cookieParser());

    await app.listen(PORT, () => {
        console.log(`Server is running on ${PORT} port`)
    })
}

start()