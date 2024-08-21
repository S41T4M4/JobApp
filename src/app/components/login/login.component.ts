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
  id: number = 0;
  nome: string ='';
cadastroUser ={
  email: '',
  senha: '',
  perfil: '',
  id: 0,
  nome: ''
}



  constructor(private authService: AuthService, private router: Router) { }


  login() {
    //debugger

      this.authService.login(this.email, this.senha, this.perfil, this.id).subscribe(response => {
      console.log('Login bem-sucedido:', response);
      if (response.perfil === 'Recrutador') {
        this.router.navigate(['/dashboard-recrutador']);
      } else if (response.perfil === 'Candidato') {
        this.router.navigate(['/dashboard-candidato']);
      } else {

        console.error('Perfil inválido.');
      }
    }, error => {
      console.error('Erro no login:', error);
    });
  }
  cadastroUsuario(){
   // debugger
    this.authService.postUsuario(this.email,this.senha,this.perfil,this.nome).subscribe(response=>{
      console.log('Cadastrado com sucesso:',response);
    }
  )

  }
}
