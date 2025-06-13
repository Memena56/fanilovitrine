import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    exp: number;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<{access_token: string}>(`${this.apiUrl}/login`, {
      username,
      password,
    });
  }

  isTokenExpired(): boolean {
  const token = this.getToken();
  if (!token) return true;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Math.floor(Date.now() / 1000); // en secondes
    return decoded.exp < now;
    } catch (e) {
      return true; // si décryptage échoue
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired();
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
