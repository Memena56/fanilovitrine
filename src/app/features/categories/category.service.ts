import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CategoryNode } from '../categories/category-node.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseApiUrl = environment.apiUrl.replace(/\/$/, '');
  private baseUrl = `${this.baseApiUrl}/categories`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl);
  }

  getTree(): Observable<CategoryNode[]> {
    return this.http.get<CategoryNode[]>(`${this.baseUrl}/tree/all`);
  }
}
