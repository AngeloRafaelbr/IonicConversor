import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  private storage: Storage | null = null;
  name: string = '';
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

  // Função de registro
  async onRegister() {
    if (this.storage) {
      await this.storage.set('user', {
        name: this.name,
        email: this.email,
        password: this.password,
      });
      console.log('Usuário registrado com sucesso!');
      this.router.navigate(['/login']);  // Redireciona para a página de login
    }
  }

  // Redirecionar para a tela de login
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
