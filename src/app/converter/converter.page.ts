import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.page.html',
  styleUrls: ['./converter.page.scss'],
})

export class ConverterPage {
  sourceCurrency: string = 'USD';
  targetCurrency: string = 'EUR';
  amount: number = 1;
  lastConvertedAmount: number | null = null;
  conversionResult: number | null = null;
  currencies: string[] = ['USD', 'EUR', 'BRL', 'GBP', 'JPY'];

  constructor(private http: HttpClient, private alertController: AlertController) {}

  async convertCurrency() {

    if (!this.amount || this.amount <= 0) {
      // Mostra o alerta
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Insira um valor válido para conversão.',
        buttons: ['OK'],
      });
      await alert.present();
      return; // Não realiza a conversão
    }

    this.lastConvertedAmount = this.amount;

    const apiKey = '6910d38e304136eeddab5b49';
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${this.sourceCurrency}/${this.targetCurrency}/${this.amount}`;
    this.http.get(url).subscribe(
      (data: any) => {
      this.conversionResult = data.conversion_result;
      }, error => {
      console.error('Erro ao acessar a API:', error);
    });
  }

  toggleCurrencies() {
    const temp = this.sourceCurrency;
    this.sourceCurrency = this.targetCurrency;
    this.targetCurrency = temp;

    this.convertCurrency();
  }
}
