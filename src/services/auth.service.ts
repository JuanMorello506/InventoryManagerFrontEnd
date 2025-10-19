import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, map, of, Observable } from 'rxjs';

interface LoginResponse {
  token: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = `https://localhost:7133/api/Auth`;
  public isLoggedIn = signal<boolean>(false);

  constructor(private http: HttpClient) {
    this.isLoggedIn.set(!!localStorage.getItem('access_token'));
  }

  register(payload: { firstName: string; lastName: string; username: string; email: string; password: string; }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, payload).pipe(
      catchError(err => of(err))
    );
  }

  login(credentials: { username: string; password: string; }): Observable<boolean> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap(res => {
        if (res && res.token) {
          localStorage.setItem('access_token', res.token);
          this.isLoggedIn.set(true);
        }
      }),
      map(res => !!res.token),
      catchError(() => of(false))
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.isLoggedIn.set(false);
  }

  get token(): string | null {
    return localStorage.getItem('access_token');
  }
}
