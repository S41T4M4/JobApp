import { AplicarCandidatura } from './../../candidatura.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-dashboard-candidato',
  templateUrl: './dashboard-candidato.component.html',
  styleUrls: ['./dashboard-candidato.component.css']
})
export class DashboardCandidatoComponent implements OnInit {
  vagas: any[] = [];
  isLoading: boolean = true;
  idCandidato = Number(localStorage.getItem('id'));
 isDisabled = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadVagas();
  }
isOpen(){
  this.isDisabled = !this.isDisabled;
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
    const candidatura: AplicarCandidatura = {
      id : 0,
      id_vaga: vagaId,
      id_candidato: this.idCandidato,
      nome_candidato:'',
      email_candidato:'',
      titulo_vagas:'',
      id_recrutador:0,
      status: 'Pendente',
      data_candidatura: new Date().toISOString(),

    };

    this.authService.postCandidatura(candidatura).subscribe(
      () => {
        console.log('Candidatura realizada com sucesso!');
        this.loadVagas();
      },
      error => {
        window.alert('Você já está cadastrado !');
        console.error('Erro ao se candidatar:', error);
      }
    );
  }
}
