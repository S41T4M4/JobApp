import { Candidatura } from './../../../candidaturas.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidatos-em-vagas',
  templateUrl: './candidatos-em-vagas.component.html',
  
  styleUrls: ['./candidatos-em-vagas.component.css']
})
export class CandidatosEmVagasComponent implements OnInit {
  candidatos: Candidatura[] = [];
  isLoading: boolean = true;
alertExists: boolean = false;
alertMessage = '';
backGroundColor = '';
fontColor = '';
  constructor(private authService: AuthService , private routeA : ActivatedRoute) {}

  ngOnInit(): void {

    const idVaga = this.routeA.snapshot.paramMap.get('id')!;
    this.loadCandidatos(parseInt(idVaga));
  }

  loadCandidatos(id_vaga: number): void {
    this.authService.getCandidaturasByIdVaga(id_vaga).subscribe(
      (response: Candidatura[]) => {
       this.candidatos = response;
       this.isLoading = false;
      }

    )

  }

  // Função para alterar o status da candidatura
  alterarStatus(idCandidatura: number, novoStatus: string): void {
    this.authService.updateStatusCandidatura(idCandidatura, novoStatus).subscribe(
      () => {
        this.alertExists = true;
        const candidatura = this.candidatos.find(c => c.id === idCandidatura);
        if (candidatura) {
          candidatura.status = novoStatus;
          if(novoStatus == 'Aprovado'){
            this.fontColor = 'black'
            this.backGroundColor = '#8bbe1b';
            this.alertMessage = 'Candidatura aprovada com sucesso!';
          }
          else if (novoStatus == 'Pendente'){
            this.fontColor = 'black'
            this.backGroundColor = '#eed202';
            this.alertMessage = 'Candidatura foi alterada para pendente';
          }
          else{
            this.fontColor = '#ffffff'
            this.backGroundColor = '#8b0000';
            this.alertMessage = 'Candidatura Rejeitada'
          }
        }
      },
      (error) => {
        console.error('Erro ao alterar status da candidatura', error);
      }
    );
  }

}
