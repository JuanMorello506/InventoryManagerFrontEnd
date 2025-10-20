import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map, of, Observable } from 'rxjs';
import { LoginResponse } from '../../interfaces/login-response.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = `https://localhost:7133/api/Auth`;
  public isLoggedIn = signal<boolean>(false);

  constructor(private http: HttpClient) {
    this.isLoggedIn.set(!!localStorage.getItem('access_token'));
  }

  register(payload: { Name: string; Surname: string; Username: string; Email: string; Password: string; }): Observable<{ success: boolean; message?: string }> {
      return this.http.post<{ message?: string }>(`${this.baseUrl}/register`, payload).pipe(
        map(response => {
          this.isLoggedIn.set(true);
          return {
            success: true,
            message: response?.message || 'Registration successful'
          };
        }),
        catchError((error: HttpErrorResponse) => {
          const message =
            error.error?.message || 
            'Server error during registration';
          return of({ success: false, message });
        })
    );
  }

  login(credentials: { Username: string; Password: string; }): Observable<{ success: boolean; message?: string }> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials).pipe(
      map(res => {
        if (res && res.token) {
          // Save token and user info
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));

          this.isLoggedIn.set(true);
          return { success: true, message: res.message || 'Login successful' };
        }
        return { success: false, message: res?.['message'] || 'Login failed' };
      }),
      catchError((error: HttpErrorResponse) => {
        const message =
          error.error?.message || 
          (error.status === 401 ? 'Invalid username or password' : 'Server error');
        return of({ success: false, message });
      })
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
