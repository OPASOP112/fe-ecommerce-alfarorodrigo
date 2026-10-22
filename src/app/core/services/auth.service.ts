import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private API_URL = `${environment.apiUrl}/api/auth`;

  login(username: string, password: string) {
    return this.http.post<{token: string}>(`${this.API_URL}/login`, { username, password }).pipe(
      tap(res => localStorage.setItem('token', res.token))
    );
  }
  
  logout() { localStorage.removeItem('token'); }
  
  isAuthenticated(): boolean { return !!localStorage.getItem('token'); }
}