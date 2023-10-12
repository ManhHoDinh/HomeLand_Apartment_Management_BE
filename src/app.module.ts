import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { PersonModule } from "./person/person.module";
import { IdGeneratorModule } from "./id_generator/id_generator.module";
import { UploadModule } from "./upload/upload.module";
import { ConfigModule } from "@nestjs/config";
import { AccountModule } from "./account/account.module";
import { JwtModule } from "@nestjs/jwt";
import { createClient } from "redis";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.register({
            secret: process.env.ACCESS_TOKEN_SECRET,
            global: true,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: async () => {
                if (process.env.IS_PRODUCTION == "true") {
                    return {
                        type: "postgres",
                        url: process.env.DB_URL,
                        synchronize: false,
                        entities: ["dist/**/*.entity{.ts,.js}"],
                        cache: {
                            duration: 5000,
                            type: "redis",
                            ignoreErrors: true,
                            options: {
                                url: process.env.REDIS_URL,
                            },
                        },
                    };
                } else {
                    const client = createClient();

                    client.on("error", (error) => {
                        console.error(error);
                    });
                    client.on("connect", async () => {
                        console.log("Connected to redis");
                    });
                    await client.connect();
                    await client.disconnect();
                    return {
                        type: "postgres",
                        url: "postgres://postgres@localhost:5432/db",
                        synchronize: true,
                        entities: ["dist/**/*.entity{.ts,.js}"],
                        duration: 5000,
                        cache: {
                            type: "redis",
                            ignoreErrors: true,
                            options: {
                                url: "redis://localhost:6379",
                            },
                        },
                    };
                }
            },
        }),
        AuthModule,
        PersonModule,
        IdGeneratorModule,
        UploadModule,
        AccountModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
