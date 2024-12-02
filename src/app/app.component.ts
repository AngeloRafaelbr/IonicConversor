import { Component } from '@angular/core';
import { SQLiteService } from './sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private sqliteService: SQLiteService) { 
    this.initializeApp(); 
  } 
  
  async initializeApp() { 
    await this.sqliteService.initializeDatabase(); 
  }
}
