import { Stock } from "../../../stock.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { IStockService } from "../primary-ports/stock.service.interface";
import { Injectable } from "@nestjs/common";
import { StockModel } from "../models/stock.model";

@Injectable()
export class StockService implements IStockService {
  allStocks: StockModel[] = [];


  constructor(@InjectRepository(Stock)
              private stockRepository: Repository<Stock>,

  ){}

  async delete(id: string): Promise<void> {
    await this.stockRepository.delete({id: id});
    this.allStocks = this.allStocks.filter((s) => s.id !== id);
  }

  async getStocks(): Promise<StockModel[]> {
    const stocks = await this.stockRepository.find();
    const stockEntities: Stock[] = JSON.parse(JSON.stringify(stocks));
    return stockEntities;
  }

  async getStockId(id: string, stockName: string, initValue: number, currentValue: number, description: string): Promise<Stock>{
    const stockDb = await this.stockRepository.findOne({
      stockName: stockName
    });
    return{
      id: stockDb.id,
        stockName: stockDb.stockName,
        initValue: stockDb.initValue,
        currentValue: stockDb.currentValue,
        description: stockDb.description,
    };
  }

  async updateStock(id: string): Promise<Stock> {
    return Promise.resolve(undefined);
  }

  async newStock(id: string, stockName: string, initValue: number, currentValue: number, description: string): Promise<StockModel> {
    const stockDb = await this.stockRepository.findOne({
      stockName: stockName
    });
    if (!stockDb){
      let stock = this.stockRepository.create();
      stock.id = id;
      stock.stockName = stockName;
      stock.initValue = initValue;
      stock.currentValue = currentValue;
      stock.description = description;
      stock = await this.stockRepository.save(stock);
      return {
        id: '' + stock.id,
        stockName: stock.stockName,
        initValue: stock.initValue,
        currentValue: stock.currentValue,
        description: stock.description,
      };
    }
    if (stockDb.id === id){
      return{
        id: stockDb.id,
        stockName: stockDb.stockName,
        initValue: stockDb.initValue,
        currentValue: stockDb.currentValue,
        description: stockDb.description,
      };
    }else {
      throw new Error('Stock Already existo');
    }
  }
}
