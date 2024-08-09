import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StockBought } from './interfaces/Stock';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private baseUrl = "http://localhost:5000";
  private stockStatsUrl = `${this.baseUrl}/stock_stats`;
  private getDashboardUrl = `${this.baseUrl}/dashboard`;
  private dataSource = new BehaviorSubject<any>(null);
  currentData = this.dataSource.asObservable();

  constructor(private http: HttpClient) { }

  getStockStats(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.stockStatsUrl}/${symbol}`);
  }
  getDashboardData(): Observable<any> {
    return this.http.get(this.getDashboardUrl);
  }
  postAction(action: string, symbol: string, quantity: number, price: number, date: string): Observable<any> {
    const body = { action, symbol, quantity, price, date };
    console.log("body", body);
    return this.http.post(`${this.getDashboardUrl}`, body);
  }
  resetPortfolio(action: string): Observable<any> {
    let JSONString: string = '{"action": "reset", "symbol": "GOOGL", "quantity": 10, "price": 200, "date": "2024-08-09 12:45:00"}';
    const resetData = JSON.parse(JSONString);
    return this.http.post(`${this.getDashboardUrl}`, resetData);
  }
  changeData(data: any) {
    this.dataSource.next(data);
  }
  getSectorStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/sector_stats`);
  }
  getCapStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cap_stats`);
  }
}
