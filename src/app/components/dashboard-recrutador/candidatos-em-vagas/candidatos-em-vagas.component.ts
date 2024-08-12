import { Candidatura } from './../../../candidaturas.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-candidatos-em-vagas',
  templateUrl: './candidatos-em-vagas.component.html',
  styleUrls: ['./candidatos-em-vagas.component.css']
})
export class CandidatosEmVagasComponent implements OnInit {
  candidatos: Candidatura[] = [];
  isLoading: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const idRecrutador = Number(localStorage.getItem('id'));
    this.loadCandidatos(idRecrutador);
  }

  loadCandidatos(idRecrutador: number): void {
    this.authService.getCandidatosByRecrutador(idRecrutador).subscribe(
      (data: Candidatura[]) => {
        this.candidatos = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar candidatos', error);
        this.isLoading = false;
      }
    );
  }

  // Função para alterar o status da candidatura
  alterarStatus(idCandidatura: number, novoStatus: string): void {
    this.authService.updateStatusCandidatura(idCandidatura, novoStatus).subscribe(
      () => {
        // Atualiza o status localmente para refletir a mudança na UI
        const candidatura = this.candidatos.find(c => c.id === idCandidatura);
        if (candidatura) {
          candidatura.status = novoStatus;
        }
      },
      (error) => {
        console.error('Erro ao alterar status da candidatura', error);
      }
    );
  }
}
