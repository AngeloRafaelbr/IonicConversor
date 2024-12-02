import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  private storage: Storage | null = null;
  email: string = '';
  password: string = '';

  constructor(
    private storageService: Storage,
    private router: Router,
    private alertController: AlertController
  ) {
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
        this.router.navigate(['/converter']);
        console.log('Login bem-sucedido!');
      } else {
        await this.showAlert('Erro', 'Email ou senha incorretos!');
      }
    }
  }

  // Exibe um alerta
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}