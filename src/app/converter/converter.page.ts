import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.page.html',
  styleUrls: ['./converter.page.scss'],
})

export class ConverterPage {

  //variaveis para o historio

  conversionHistory: { 
    sourceCurrency: string, 
    targetCurrency: string, 
    amount: number, 
    result: number, 
    date: string }[] = [];

  //variáveis para conversão direta:
  sourceCurrency: string = 'USD';
  targetCurrency: string = 'EUR';
  amount: number = 1;
  lastConvertedAmount: number | null = null;
  conversionResult: number | null = null;
  currencies: string[] = [
    'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 
    'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 
    'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 
    'COP', 'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 
    'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'FOK', 'GBP', 'GEL', 'GGP', 'GHS', 
    'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 
    'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 
    'JPY', 'KES', 'KGS', 'KHR', 'KID', 'KMF', 'KRW', 'KWD', 'KYD', 'KZT', 
    'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 
    'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 
    'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 
    'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 
    'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 'SOS', 'SRD', 'SSP', 
    'STN', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 
    'TVD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VES', 'VND', 
    'VUV', 'WST', 'XAF', 'XCD', 'XDR', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 
    'ZWL'
  ];;

  constructor(private http: HttpClient, private alertController: AlertController, private router: Router) {}

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
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${this.sourceCurrency}/${this.targetCurrency}/${this.amount}`
    this.http.get(url).subscribe(
      (data: any) => {
      this.conversionResult = data.conversion_result;

      if (this.conversionResult !== null) {
        const conversionDate = new Date().toLocaleString();  // Obtém a data e hora atual
        this.conversionHistory.unshift({
          sourceCurrency: this.sourceCurrency,
          targetCurrency: this.targetCurrency,
          amount: this.amount,
          result: this.conversionResult, 
          date: conversionDate
        });
      }
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

  navigateToConverter() {
    this.router.navigate(['/converter']); // Redireciona para a página de conversão direta
  }

  navigateToChart() {
    this.router.navigate(['/multiple-conversion']); // Redireciona para a página de conversão múltipla (ainda a ser criada)
  }

  navigateToSupport() {
    this.router.navigate(['/supported-currencies']); // Redireciona para a página de conversões suportadas
  }
}