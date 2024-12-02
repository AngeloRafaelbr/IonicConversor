import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { SQLiteService } from '../sqlite.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  constructor(private router: Router, private sqliteService : SQLiteService) {
    
   }

//variaveis para o historio

conversionHistory: { 
  sourceCurrency: string, 
  targetCurrency: string, 
  amount: number, 
  result: number, 
  date: string }[] = [];

  private db: any; // Variável para armazenar a conexão com o banco de dados

  
  async ngOnInit() {     
    this.db = this.sqliteService.getDbConnection();       
    this.initializeDatabase();     
  }

  async initializeDatabase() {
    try {

      // Carrega o histórico de conversões já salvo
      this.loadHistory();
    } catch (error) {
      console.error('Erro ao inicializar o banco de dados', error);
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
