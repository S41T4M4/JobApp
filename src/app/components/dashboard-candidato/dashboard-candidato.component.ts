import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Candidatura } from '../../candidaturas.model'; // Certifique-se de que o caminho está correto

@Component({
  selector: 'app-dashboard-candidato',
  templateUrl: './dashboard-candidato.component.html',
  styleUrls: ['./dashboard-candidato.component.css'],
})
export class DashboardCandidatoComponent implements OnInit {
  vagas: any[] = [];
  isLoading: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadVagas();
  }

  loadVagas(): void {
    this.authService.getVagasAbertas().subscribe(
      (data: any[]) => {
        this.vagas = data;
        this.isLoading = false;
      },
      error => {
        console.error('Erro ao carregar vagas:', error);
      }
    );
  }

  applyVaga(vagaId: number): void {
    const candidatura: Candidatura = {
      id_vaga: vagaId,
      id_candidato: 0,
      status: 'Pendente',
      data_candidatura: new Date().toISOString(),
      nome_candidato: '',
      email_candidato: '',
      titulo_vagas: ''
      ,
      id: 0,
      vaga: {
        id: 0,
        titulo: '',
        descricao: '',
        status: ''
      },
      candidato: {
        id: 0,
        nome: '',
        email: ''
      }
    };

    this.authService.postCandidatura(candidatura).subscribe(
      () => {
        alert('Candidatura enviada com sucesso!');
        this.loadVagas(); // Recarrega as vagas após a candidatura
      },
      error => {
        console.error('Erro ao se candidatar:', error);
      }
    );
  }
}
