import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => {
        console.log('database_url ', ConfigService.get('DATABASE_URL'))
        return ({
          type: 'postgres',
          url: ConfigService.get('DATABASE_URL'),
          autoLoadEntities: true,
          synchronize: true,
          logging: true,
        })
      }
    }),
    //TypeOrmModule.forRoot({
    //  type: 'postgres',
    //  url: 'postgres://postgres:postgres@localhost:5432/devshop',
    //  autoLoadEntities: true,
    //  synchronize: true,
    //  //entities: [Category],
    //  logging: true,
    //}),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
      driver: ApolloDriver,
    }),
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
