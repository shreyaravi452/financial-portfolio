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
  postAction(action: string, symbol: string, quantity: number, price: number): Observable<any> {
    const body = { action, symbol, quantity, price };
    return this.http.post(`${this.getDashboardUrl}`, body);
  }
  resetPortfolio(action: string): Observable<any> {
    const body = { action };
    return this.http.post(`${this.getDashboardUrl}`, body);
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
