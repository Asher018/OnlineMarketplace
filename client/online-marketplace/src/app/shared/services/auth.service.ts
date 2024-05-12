import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  
  private user: User | null = null;

  constructor(private http: HttpClient) {

  }

  // login
  login(email: string, password: string) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);



    return this.http.post('http://localhost:5000/app/login', body, {headers: this.headers, withCredentials: true});
  }

  register(user: User) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('name', user.name);
    body.set('address', user.address);
    body.set('nickname', user.nickname);
    body.set('password', user.password);

    return this.http.post('http://localhost:5000/app/register', body, {headers: this.headers});
  }

  logout() {
    return this.http.post('http://localhost:5000/app/logout', {}, {withCredentials: true, responseType: 'text'});
  }

  checkAuth() {
    return this.http.get<boolean>('http://localhost:5000/app/checkAuth', {withCredentials: true});
  }

  async getCurrentUser(): Promise<User | null> {
    this.user = await firstValueFrom(this.http.get<User | null>('http://localhost:5000/app/getCurrentUser', {withCredentials: true}));
    return this.user;
  }

  getUser(): User | null {
    return this.user;
  }
}
