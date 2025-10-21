import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface News {
  _id: string;
  title: string;
  slug: string;
  introduction: string;
  content: string;
  date: string;
  photo: string;
  othersPhotos?: string[];
  category?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseApiUrl = environment.apiUrl.replace(/\/$/, '');
  private newsUrl = `${this.baseApiUrl}/news`;

  constructor(private http: HttpClient) { }

  getNews(): Observable<News[]>{
    return this.http.get<News[]>(this.newsUrl);
  }

  getNewsByCategory(category: string): Observable<News[]>{
    return this.http.get<News[]>(`${this.newsUrl}/category/${category}`);
  }

  getLatestNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.newsUrl}/latest`);
  }

  getPaginatedNews(page: number, limit: number, categories?: string[]): Observable<any> {
  let url = `${this.newsUrl}?page=${page}&limit=${limit}`;
  if (categories && categories.length > 0) {
    categories.forEach(cat => {
      url += `&category=${encodeURIComponent(cat)}`;
    });
  }
  return this.http.get<any>(url);
}

  getNew(slug: string): Observable<News>{
    return this.http.get<News>(`${this.newsUrl}/${slug}`);
  }

  createNews(newsData: Partial<News>): Observable<News> {
    return this.http.post<News>(this.newsUrl, newsData);
  }

  updateNews(id: string, updateData: Partial<News>): Observable<News>{
    return this.http.patch<News>(`${this.newsUrl}/${id}`, updateData);
  }

  deleteNews(id: string): Observable<any>{
    return this.http.delete<any>(`${this.newsUrl}/${id}`);
  }

}
