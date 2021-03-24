import { StockModel } from "../models/stock.model";
import { Stock } from "../../../stock.entity";



export const IStockServiceProvider = 'IStockServiceProvider';
export interface IStockService {
  newStock(
    id: string,
    stockName: string,
    initValue: number,
    currentValue: number,
    description: string,
  ): Promise<StockModel>;

  getStocks(): Promise<StockModel[]>;

  delete(id: string): Promise<void>;

  updateStock(id: string): Promise<Stock>;

  getStockId(id: string, stockName: string, initValue: number, currentValue: number, description: string): Promise<Stock>;
}
