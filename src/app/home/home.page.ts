import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private router: Router) {}
navigateToConverter() {
    this.router.navigate(['/converter']); // Redireciona para a página de conversão direta
  }
}
