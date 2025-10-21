import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Article {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  images: string[];
  sizes: string[];
  tags: string[];
  category: {
    _id: string;
    name: string;
    parent: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedArticlesResponse {
  data: Article[];
  total: number;
  page: number;
  lastPage: number;
}

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private baseApiUrl = environment.apiUrl.replace(/\/$/, '');
  private shopsUrl = `${this.baseApiUrl}/shops`;

  constructor(private http: HttpClient) {}

  getPaginatedArticles(
    page: number,
    limit: number,
    categoryIds?: string[]
  ): Observable<PaginatedArticlesResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (categoryIds && categoryIds.length > 0) {
      categoryIds.forEach((catId) => {
        params = params.append('categories', catId);
      });
    }
    console.log('Category filter received:', categoryIds);

    return this.http.get<PaginatedArticlesResponse>(this.shopsUrl, { params });
  }

  getArticleBySlug(slug: string): Observable<Article> {
    return this.http.get<Article>(`${this.shopsUrl}/${slug}`);
  }
}
