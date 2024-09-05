import { AuthService } from './../../auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Empresa } from '../../empresa.model';

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
cnpj: string = '';
empresa_id:number=0;
showRecruiter = false;
showCandidato = false;
showButtons = true;
showLogin = false;
titleForm = 'Login';
showFormButtons = false;
cadastroEmpresa = false;
backgroundColor = '';
isRecrutador:boolean = false;
isChoice:boolean = true;
isCandidate:boolean = false;
isLabel:boolean = true;
titulo = 'BRINKEDIN';
backGroundColor = '';
color = '';

  constructor(private authService: AuthService, private router: Router , private formBuilder : FormBuilder) {
  }
isRecrutier(){

  this.showFormButtons = false;
  this.showRecruiter = true;
  this.showButtons = false;
  this.showLogin = true;
}
isCandidato(){
  this.showCandidato = true;
  this.showButtons = false;
  this.showLogin = true;
}

login() {
  this.authService.login(this.email, this.senha, this.perfil, this.id, this.nome, this.cnpj,this.empresa_id).subscribe(
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
        this.userAlreadyExists = true;
        this.message = error.error;
        this.backGroundColor = '#8b0000'
      } else if (error.status === 401) {
         this.userAlreadyExists = true;
        this.message = error.error;
        this.backGroundColor = '#8b0000'
      } else {
        this.userAlreadyExists = true;
        this.message = error.error;
        this.backGroundColor = '#8b0000'
      }
    }
  );
}
continueLogin(){
  this.showFormButtons = false;
  this.showRecruiter = true;
}

cadastroEmpresaForm(){
  this.titulo = 'Empresa'
  this.cadastroEmpresa= true;
  this.isChoice = false;

}
showButtonsChoice(){
  this.showFormButtons = true;
}
cadastroCandidato(){
  this.titulo = 'Candidato'
  this.isLabel = false;
  this.isCandidate = true;
  this.isChoice = false;
}
cadastroRecrutador(){
   this.titulo ='Recrutador';
  this.isLabel = false;
  this.isRecrutador = true;
  this.isChoice = false;

}
candidato = 'Candidato';

  cadastroUsuarioCandidato() {

    this.authService.postUsuarioCandidato(this.nome,this.email, this.senha , this.perfil).subscribe(
      response => {
        this.userAlreadyExists = true;
        this.message = 'Cadastrado com sucesso';
        this.backGroundColor = '#006400';
        this.color = '#ffffff';
        console.log('Cadastrado com sucesso:', response);

      },
      error => {
        if (error.status === 400 || error.status === 401) {
          this.color = '#ffffff'
          this.backGroundColor = '#8b0000'
          this.userAlreadyExists = true;
          this.message = error.error;

        } else if (error.status === 500) {
          this.message = error.error;
          this.userAlreadyExists = true;
        } else {
          this.message = error.error;
        }
      }
    );
  }
  cadastrarRecrutador() {
    this.authService.postUsuarioRecrutador(this.email, this.nome,this.senha,this.cnpj).subscribe(
      response => {
         this.userAlreadyExists = true;
        this.message = 'Cadastrado com sucesso';
        this.backGroundColor = '#006400';
        this.color = '#ffffff';
        console.log('Usuário cadastrado com sucesso:', response);

      },
      error => {
        console.log('Erro ao cadastrar recrutador:', error);
        if (error.status === 400 || error.status === 401) {
          this.color = '#ffffff'
          this.backGroundColor = '#8b0000'
          this.userAlreadyExists = true;
          this.message = error.error;
        } else if (error.status === 500) {
          this.color = '#ffffff'
          this.backGroundColor = '#8b0000'
          this.userAlreadyExists = true;
          this.message = error.error;
        } else {
          this.color = '#ffffff'
          this.backGroundColor = '#8b0000'
          this.userAlreadyExists = true;
          this.message = error.error;
        }
      }
    );
  }

postEmpresa() {
  this.authService.postEmpresas( this.nome, this.cnpj).subscribe(
    response => {
     console.log("Empresa Cadastrada" , response)
     this.userAlreadyExists = true;
     this.message = 'Cadastrado com sucesso';
     this.backGroundColor = '#006400';
     this.color = '#ffffff';
    },
    error => {
      this.color = '#ffffff'
      this.backGroundColor = '#8b0000'
      this.userAlreadyExists = true;
      this.message = error.error;
      console.error(error);
    }

  )
}
  backToLoginChoices() {
    this.showButtons = true;
    this.showCandidato = false;
    this.showRecruiter = false;
    this.showFormButtons = false;
    this.cadastroEmpresa = false;
  }

    backToCadastroChoices() {
    this.titulo = 'BRINKEDIN';
    this.isChoice = true;
    this.isRecrutador = false;
    this.isCandidate = false;
    this.showFormButtons = false;
    this.cadastroEmpresa = false;
  }


}
