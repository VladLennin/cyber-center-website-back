import * as process from "process";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";


async function start() {
    const PORT = process.env.PORT || 3001
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle("WebSite Endpoints")
        .setDescription("REST API documentation for Cyber Center WebSite")
        .setVersion("1.0.0")
        .addTag("Developer - Vladlen Marchenko")
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("/api/docs", app, document)

    await app.listen(PORT, () => {
        console.log(`Server is running on ${PORT} port`)
    })
}

start()