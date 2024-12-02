// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular'; // Para usar o Ionic Storage
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storage: Storage) {}

  // Método de ativação do guard
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>((observer) => {
      // Inicializa o Ionic Storage
      this.storage.create().then(() => {
        // Acessa os dados do usuário no Ionic Storage
        this.storage.get('user').then((user) => {
          if (user) {
            // Se o usuário estiver autenticado, permite a navegação
            observer.next(true);
          } else {
            // Se o usuário não estiver autenticado, redireciona para o login
            this.router.navigate(['/login']);
            observer.next(false);
          }
          observer.complete();
        });
      });
    });
  }
}
