import { Component } from '@angular/core';
import { Vaga } from '../../../vaga.model';
import { AuthService } from '../../../auth.service';
import { Candidatura } from '../../../candidaturas.model';
@Component({
  selector: 'app-vagas-aplicadas',
  templateUrl: './vagas-aplicadas.component.html',
  styleUrl: './vagas-aplicadas.component.css'
})

export class VagasAplicadasComponent {
text = '';
candidatura :Candidatura[] = [];
isLoading: boolean = true;
isDelete = false;
 constructor(private authService: AuthService) { }

 ngOnInit(){

  this.getCandidaturas();
 };


   getCandidaturas(): void {
    const candidatoId = Number(localStorage.getItem('id'));
    this.authService.getCandidaturasByIdCandidato(candidatoId).subscribe(
      (data: Candidatura[]) => {
        this.candidatura = data;
        this.isLoading = false;

      },
      (error) => {
        console.error('Erro ao carregar vagas', error);

      }
    );
  }
  deletCandidatura(id : number):void{
  this.isDelete = true;
    this.authService.deleteCandidatura(id).subscribe(
     ()=>{
      this.candidatura = this.candidatura.filter( c => c.id !== id);
      console.log('Candidatura excluida com sucesso !');
     },
     (error) =>{
      console.error('Erro ao deletar candidatura', error);
     }
    )
  }
}

