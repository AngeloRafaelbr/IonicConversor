import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multiple-conversion',
  templateUrl: './multiple-conversion.page.html',
  styleUrls: ['./multiple-conversion.page.scss'],
})
export class MultipleConversionPage{

  constructor(private router: Router) { }

  amount: number = 1;
  currencies: string[] = ['USD', 'EUR', 'BRL', 'GBP', 'JPY'];


  navigateToConverter() {
    this.router.navigate(['/converter']); // Redireciona para a página de conversão direta
  }

  navigateToChart() {
    this.router.navigate(['/multiple-conversion']); // Redireciona para a página de conversão múltipla (ainda a ser criada)
  }

}
