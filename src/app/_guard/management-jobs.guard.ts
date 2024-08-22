import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementJobsGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const perfil = this.authService.getPerfil();
    if (perfil === 'Recrutador') {
      console.log("Acesso concedido a Recrutador")
      return true;
    } else {
      console.log('Acesso negado para Recrutador!');
      this.router.navigate(["/wrong-page"]);
      return false;
    }
  }
}
