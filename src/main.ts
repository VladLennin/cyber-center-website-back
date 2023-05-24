import * as process from "process";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser';

async function start() {
    const PORT = process.env.PORT || 3001
    const app = await NestFactory.create(AppModule)
    app.enableCors({
        origin:true,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 200,
    });
    const config = new DocumentBuilder()
        .setTitle("WebSite Endpoints")
        .setDescription("REST API documentation for Cyber Center WebSite")
        .setVersion("1.0.0")
        .addTag("Developer - Vladlen Marchenko")
        .build()


    // app.useGlobalPipes(new ValidationPipe())
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("/api/docs", app, document)

    await app.listen(PORT, () => {
        console.log(`Server is running on ${PORT} port`)
    })
}

start()