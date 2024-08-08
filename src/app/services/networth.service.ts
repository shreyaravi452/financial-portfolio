
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworthService {
  private apiUrl = 'http://localhost:5000/dashboard'; // Change to your Flask API endpoint

  constructor(private http: HttpClient) {}

  getNetworth(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
