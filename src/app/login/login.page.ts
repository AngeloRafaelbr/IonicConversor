import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.email === 'admin@example.com' && this.password === 'password') {
      // Simulação de login bem-sucedido
      alert('Login bem-sucedido!');
      this.router.navigate(['/supported-currencies']);
    } else {
      alert('Credenciais inválidas.');
    }
  }
}
