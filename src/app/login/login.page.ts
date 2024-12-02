import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  private storage: Storage | null = null;
  email: string = '';
  password: string = '';

  constructor(private storageService: Storage, private router: Router) {
    this.initStorage();
  }

  // Inicializa o Ionic Storage
  async initStorage() {
    const storage = await this.storageService.create();
    this.storage = storage;
  }

  // Função de login
  async onLogin() {
    if (this.storage) {
      const user = await this.storage.get('user');
      if (user && user.email === this.email && user.password === this.password) {
        console.log('Login bem-sucedido!');
        this.router.navigate(['/converter']);  // Redireciona para a página inicial
      } else {
        console.log('Email ou senha incorretos!');
      }
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
