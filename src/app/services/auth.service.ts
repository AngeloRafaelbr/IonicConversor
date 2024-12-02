import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInKey = 'isLoggedIn';

  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem(this.loggedInKey, 'true');
      return true;
    }
    return false;
  }

  register(name: string, email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u: any) => u.email === email)) {
      return false; // Usuário já existe
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.loggedInKey);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.loggedInKey) === 'true';
  }
}
