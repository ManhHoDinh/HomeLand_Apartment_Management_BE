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

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.register({
            secret: process.env.ACCESS_TOKEN_SECRET,
            global: true,
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            url:
                process.env.IS_PRODUCTION == "false"
                    ? "postgres://postgres@localhost:5432/db"
                    : process.env.DB_URL,
            synchronize: true,
            entities: ["dist/**/*.entity{.ts,.js}"],
            cache: {
                type: "redis",
                ignoreErrors: true,
                options:
                    process.env.IS_PRODUCTION == "false"
                        ? {
                              url: "redis://localhost:6379",
                          }
                        : {
                              url: process.env.REDIS_URL,
                          },
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
