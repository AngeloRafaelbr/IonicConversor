import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { Storage } from '@ionic/storage-angular';
import { SQLiteService } from '../sqlite.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.page.html',
  styleUrls: ['./converter.page.scss'],
})

export class ConverterPage {

  constructor(private http: HttpClient, private alertController: AlertController, private router: Router,private sqliteService : SQLiteService, private storage: Storage) {
    
  }

  //variaveis para o historico

  conversionHistory: { 
    sourceCurrency: string, 
    targetCurrency: string, 
    amount: number, 
    result: number, 
    date: string }[] = [];

    private db: any; // Variável para armazenar a conexão com o banco de dados

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


  //BANCO DE DADOS

  async ngOnInit() {     
    this.db = this.sqliteService.getDbConnection();      
    this.initializeDatabase();      
  }

   // Inicializa o banco de dados SQLite e cria a tabela, se necessário
  async initializeDatabase() {
    try {

      // Carrega o histórico de conversões já salvo
      this.loadHistory();
    } catch (error) {
      console.error('Erro ao inicializar o banco de dados', error);
    }
  }

  async saveToDatabase(history: { sourceCurrency: string, targetCurrency: string, amount: number, result: number, date: string }) {
    try {
      if (this.db) {
        const query = `
          INSERT INTO conversion_history (sourceCurrency, targetCurrency, amount, result, date)
          VALUES (?, ?, ?, ?, ?)
        `;
        const result = await this.db.run(query, [
          history.sourceCurrency,
          history.targetCurrency,
          history.amount,
          history.result,
          history.date,
        ]);
  
        console.log('Histórico salvo com sucesso:', result);
      }
    } catch (error) {
      console.error('Erro ao salvar no banco de dados:', error);
    }
  }
  
  async loadHistory() {
    try {
      if (this.db) {
        const queryResult = await this.db.query('SELECT * FROM conversion_history ORDER BY date DESC');
        console.log('Dados carregados do banco:', queryResult);
  
        this.conversionHistory = queryResult.values.map((row: any) => ({
          sourceCurrency: row.sourceCurrency,
          targetCurrency: row.targetCurrency,
          amount: row.amount,
          result: row.result,
          date: row.date,
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  }

  async clearHistory() {
    try {
      if (this.db) {
        await this.db.execute('DELETE FROM conversion_history');
        this.conversionHistory = []; // Limpar a lista na interface
        console.log('Histórico limpo com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao limpar histórico:', error);
    }
  }

  
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
      async (data: any) => {
      this.conversionResult = data.conversion_result;


      if (this.conversionResult !== null) {
        const conversionDate = new Date().toLocaleString();  // Obtém a data e hora atual
        const newHistory = {
          sourceCurrency: this.sourceCurrency,
          targetCurrency: this.targetCurrency,
          amount: this.amount,
          result: this.conversionResult, 
          date: conversionDate
        };

        // Adicionar ao início da lista
        this.conversionHistory.unshift(newHistory);

        // Salvar no banco de dados
        await this.saveToDatabase(newHistory);
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

  navigateTohistory() {
    this.router.navigate(['/history']); // Redireciona para a página de conversões suportadas
  }

  async logout() {
    await this.storage.remove('user');
    this.router.navigate(['/login']);
  }
}