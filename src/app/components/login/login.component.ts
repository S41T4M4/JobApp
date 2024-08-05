import { AuthService } from './../../auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  perfil: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.senha, this.perfil).subscribe(response => {
      console.log('Login bem-sucedido:', response);

      if (this.perfil === 'Recrutador') {
        console.log('O perfil será redirecionado para a página recrutador !')
        this.router.navigate(['/dashboard-recrutador']);
      } else if (this.perfil === 'Candidato') {

        this.router.navigate(['/dashboard-candidato']);
      } else {

        console.error('Perfil inválido.');
      }
    }, error => {
      console.error('Erro no login:', error);
    });
  }
}
