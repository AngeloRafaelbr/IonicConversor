import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
 
@Injectable({
  providedIn: 'root',
})
export class SQLiteService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
 
  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.initializeDatabase();
  }
 
  async initializeDatabase(): Promise<void> {
    try {
      if (!this.db) {
        this.db = await this.sqlite.createConnection('my_database', false, 'no-encryption', 1,false);
        await this.db.open();
        console.log('Database connection established.');
      }

      // Cria a tabela se não existir
      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS conversion_history(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        sourceCurrency TEXT, 
        targetCurrency TEXT, 
        amount REAL, 
        result REAL, 
        date TEXT
        )`
      );
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }
 
  getDbConnection(): SQLiteDBConnection | null {
    return this.db;
  }
 
  async closeConnection(): Promise<void> {
    if (this.db) {
      await this.sqlite.closeConnection('my_database',false);
      this.db = null;
      console.log('Database connection closed.');
    }
  }
}

