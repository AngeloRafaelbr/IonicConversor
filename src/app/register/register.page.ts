import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(
    private storageService: Storage,
    private router: Router,
    private alertController: AlertController // Injeta o AlertController
  ) {
    this.initStorage();
  }

  // Inicializa o Ionic Storage
  async initStorage() {
    const storage = await this.storageService.create();
    this.storage = storage;
  }

  // Função de registro
  async onRegister() {
    if (!this.name || !this.email || !this.password) {
      // Exibe alerta caso algum campo esteja vazio
      this.showAlert('Aviso', 'Preencha todos os campos com dados válidos!');
      return;
    }

    if (this.storage) {
      await this.storage.set('user', {
        name: this.name,
        email: this.email,
        password: this.password,
      });

      // Exibe alerta de sucesso
      await this.showAlert('Sucesso', 'Usuário registrado com sucesso!');
      this.router.navigate(['/login']); // Redireciona para a página de login
    }
  }

  // Exibe um alerta genérico
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Redirecionar para a tela de login
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
