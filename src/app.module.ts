import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './transaction/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';

@Module({
  imports: [TransactionModule, TypeOrmModule.forRoot(config), HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
