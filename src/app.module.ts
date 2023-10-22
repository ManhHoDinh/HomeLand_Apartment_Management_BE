import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { PersonModule } from "./person/person.module";
import { IdGeneratorModule } from "./id_generator/id-generator.module";
import { UploadModule } from "./upload/upload.module";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { HashModule } from "./hash/hash.module";
import { PersonFactoryModule } from "./person-factory/person-factory.module";
import { SeedModule } from "./seeding/seeding.module";
import { MeModule } from "./me/me.module";
import { ApartmentModule } from "./apartment/apartment.module";
import { TokenModule } from "./token/token.module";

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
                        synchronize: true,
                        entities: ["dist/**/*.entity{.ts,.js}"],
                        cache: {
                            duration: 5000,
                            type: "redis",
                            options: {
                                url: process.env.REDIS_URL,
                            },
                        },
                    };
                } else {
                    return {
                        logging: false,
                        type: "postgres",
                        url: process.env.DB_LOCAL_URL,
                        synchronize: true,
                        entities: ["dist/**/*.entity{.ts,.js}"],
                        duration: 5000,
                        cache: {
                            type: "redis",
                            options: {
                                url: process.env.REDIS_LOCAL_URL,
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
        HashModule,
        PersonFactoryModule,
        SeedModule,
        ApartmentModule,
        MeModule,
        TokenModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
