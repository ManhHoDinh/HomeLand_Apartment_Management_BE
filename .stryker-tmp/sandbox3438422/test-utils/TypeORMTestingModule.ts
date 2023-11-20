// @ts-nocheck
import { TypeOrmModule } from '@nestjs/typeorm';
import { async } from 'rxjs';

export const TypeORMTestingModule = (entities: any[]) =>
  TypeOrmModule.forRootAsync({
    useFactory: async () => {
            return {
                type: "postgres",
                url: process.env.DB_LOCAL_URL,
                synchronize: true,
                entities: [...entities],
                duration: 5000,
                cache: {
                    type: "redis",
                    options: {
                        url: process.env.REDIS_LOCAL_URL,
                    },
                },
            };
    },
   
  });