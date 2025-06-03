import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface News {
  _id: string;
  title: string;
  introduction: string;
  content: string;
  date: string;
  photo: string;
  otherphoto?: [string];
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseApiUrl = environment.apiUrl;
  private newsUrl = `${this.baseApiUrl}/news`

  constructor(private http: HttpClient) { }

  getNews(): Observable<News[]>{
    return this.http.get<News[]>(this.newsUrl);
  }

  getNew(id: string): Observable<News>{
    return this.http.get<News>(`${this.newsUrl}/${id}`);
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
