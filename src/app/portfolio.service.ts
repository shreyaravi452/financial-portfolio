import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private baseUrl = "http://localhost:5000";
  private stockStatsUrl = `${this.baseUrl}/stock_stats`;
  private getDashboardUrl = `${this.baseUrl}/dashboard`;
  private getHistoricalUrl =`${this.baseUrl}/historical_data`;
  private getNetworthGraphUrl =`${this.baseUrl}/networthgraph_data`;
  constructor(private http: HttpClient) { }

  getStockStats(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.stockStatsUrl}/${symbol}`);
  }
  getDashboardData(): Observable<any> {
    return this.http.get(this.getDashboardUrl);
  }
  getHistoricalData(symbol: string, startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.getHistoricalUrl}?symbol=${symbol}&start_date=${startDate}&end_date=${endDate}`);
  }
  getNetworthGraphData(symbol: string, startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.getNetworthGraphUrl}?start_date=${startDate}&end_date=${endDate}`);
  }
  postAction(action: string, symbol: string, quantity: number, price: number): Observable<any> {
    const body = { action, symbol, quantity, price };
    return this.http.post(`${this.baseUrl}/dashboard`, body);
  }

}
