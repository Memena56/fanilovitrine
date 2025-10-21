import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


export interface Gouvernance {
  _id: string;
  name: string;
  startYear: number;
  endYear?: number;
  photo?: string;
  role: 'aumonier' | 'commissaire';
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})

export class AboutService {
  private baseApiUrl = environment.apiUrl.replace(/\/$/, '');
  private gouvernanceUrl = `${this.baseApiUrl}/gouvernance`;

  constructor(private http: HttpClient) { }

  getGouvernances(): Observable<Gouvernance[]> {
    return this.http.get<Gouvernance[]>(this.gouvernanceUrl);
  }

  getGouvernance(id: string): Observable<Gouvernance> {
    return this.http.get<Gouvernance>(`${this.gouvernanceUrl}/${id}`);
  }

  createGouvernance(data: Partial<Gouvernance>): Observable<Gouvernance> {
    return this.http.post<Gouvernance>(this.gouvernanceUrl, data);
  }

  updateGouvernance(id: string, data: Partial<Gouvernance>): Observable<Gouvernance> {
    return this.http.put<Gouvernance>(`${this.gouvernanceUrl}/${id}`, data);
  }

  deleteGouvernance(id: string): Observable<any> {
    return this.http.delete<any>(`${this.gouvernanceUrl}/${id}`);
  }
}
