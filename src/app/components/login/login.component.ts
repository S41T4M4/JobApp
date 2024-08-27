import { AuthService } from './../../auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
isLogged = false;
message = '';
userAlreadyExists = false;
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

  constructor(private authService: AuthService, private router: Router , private formBuilder : FormBuilder) {
  }


login() {
  this.authService.login(this.email, this.senha, this.perfil, this.id, this.nome).subscribe(
    response => {
      this.isLogged = false;
      console.log('Login bem-sucedido:', response);
      if (response.perfil === 'Recrutador') {
        this.router.navigate(['/dashboard-recrutador']);
      } else if (response.perfil === 'Candidato') {
        this.router.navigate(['/dashboard-candidato']);
      }
    },
    error => {

      console.log('Erro no login:', error);

      if (error.status === 400) {
        this.isLogged = true;
        this.message = 'Campos não preenchidos';
      } else if (error.status === 401) {
        this.isLogged = true;
        this.message = 'Email ou senha inválidos';
      } else {
        this.isLogged = true;
        this.message = 'Email ou senha inválidos';
      }
    }
  );
}

cadastroUsuario() {
  this.authService.postUsuario(this.email, this.senha, this.perfil, this.nome).subscribe(
    response => {
      console.log('Cadastrado com sucesso:', response);

      alert('Usuário cadastrado com sucesso!');
    },
    error => {

      if (error.status === 400 || error.status === 401) {
        this.message = 'O usuario já está cadastrado !'
        this.userAlreadyExists = true;
      } else if(error.status === 500) {
         this.message = 'Usuário está faltando informações !'
         this.userAlreadyExists = true;
      }
      else{
        this.message = 'Erro não esperado ocorreu';
      }
    }
  );
}

}
