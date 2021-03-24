import { Module } from '@nestjs/common';

import { TypeOrmModule } from "@nestjs/typeorm";
import { Stock } from "../../stock.entity";
import { StockGateway } from "./gateway/stock.gateway";
import { StockService } from "../core/services/stock.service";
import { IStockServiceProvider } from "../core/primary-ports/stock.service.interface";

@Module({
  imports: [
    TypeOrmModule.forFeature([Stock])
  ],
  providers: [
    StockGateway,
    {
      provide: IStockServiceProvider,
      useClass: StockService,
    },
  ],
})
export class StockModule {}
