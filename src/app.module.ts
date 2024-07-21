import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import {Cart} from './cart/models/cart.entity';
import { CartItem } from './cart/models/cart-item.entity';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from '../config';
import { typeOrmConfig } from 'typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host:DB_HOST,
    //   port: parseInt(DB_PORT, 10),
    //   username:DB_USERNAME,
    //   password:DB_PASSWORD,
    //   database:DB_NAME,
    //   entities:[Cart, CartItem],
    //   synchronize:true
    // }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Cart, CartItem]),
    AuthModule,
    CartModule,
    OrderModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
