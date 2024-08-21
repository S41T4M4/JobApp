import { AplicarCandidatura } from './../../candidatura.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-dashboard-candidato',
  templateUrl: './dashboard-candidato.component.html',
  styleUrls: ['./dashboard-candidato.component.css']
})
export class DashboardCandidatoComponent implements OnInit {
 vagas: any[] = []; // Array para armazenar as vagas carregadas
isLoading: boolean = true; // Indica se os dados estão sendo carregados
idCandidato = Number(localStorage.getItem('id')); // Obtém o ID do candidato armazenado no localStorage e converte para número
isDisabled = false;
confirmedCandidatura = '';

// Injeção do serviço de autenticação no construtor
constructor(private authService: AuthService) { }

// Método chamado automaticamente quando o componente é inicializado
ngOnInit(): void {
  this.loadVagas(); // Carrega as vagas disponíveis
}


isOpen() {
  this.isDisabled = !this.isDisabled;
}

// Carrega as vagas chamando o serviço de autenticação
loadVagas(): void {
  this.authService.getVagasAbertas().subscribe(
    (data: any[]) => {
      this.vagas = data; // Armazena as vagas carregadas
      this.isLoading = false; // Indica que o carregamento foi concluído
    },
    error => {
      console.error('Erro ao carregar vagas:', error);
    }
  );
}

// Aplica para uma vaga específica
applyVaga(vagaId: number): void {
  // Criado um objeto de candidatura
  const candidatura: AplicarCandidatura = {
    id : 0,
    id_vaga: vagaId,
    id_candidato: this.idCandidato,
    nome_candidato:'',
    email_candidato:'',
    titulo_vagas:'',
    id_recrutador: 0,
    status: 'Pendente',
    data_candidatura: new Date().toISOString()
  };

  // Chama o serviço para enviar a candidatura
  this.authService.postCandidatura(candidatura).subscribe(
    () => {
      this.confirmedCandidatura = 'Candidatura confirmada !';
      console.log('Candidatura realizada com sucesso!'  + this.confirmedCandidatura);
      this.loadVagas();
    },
    error => {
      window.alert('Você já está cadastrado!');
      console.error('Erro ao se candidatar:', error);
    }
  );
}
}
