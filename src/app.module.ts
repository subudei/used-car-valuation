import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Report } from './reports/report.entity';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report], //[__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // only for dev mode
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// run app in dev mode with `npm run start:dev`

// open db.sqlite with sqlite extension (in vscode cmd + shift + p Sqlite open database ) and run `select * from user;` and `select * from report;` to see the tables created
