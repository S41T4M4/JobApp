import { AplicarCandidatura } from './../../candidatura.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth.service';
import { AlertComponent } from '@coreui/angular';
import { AlertsComponent } from '../alerts/alerts.component';

@Component({
  selector: 'app-dashboard-candidato',
  templateUrl: './dashboard-candidato.component.html',
  styleUrls: ['./dashboard-candidato.component.css']
})
export class DashboardCandidatoComponent implements OnInit {
  @ViewChild(AlertComponent) alertComponent!: AlertsComponent;
 vagas: any[] = [];
isLoading: boolean = true;
idCandidato = Number(localStorage.getItem('id'));
isDisabled = false;
confirmedCandidatura = '';
existingCandidatura = '';
showAlert = true;
isSubmitted? : boolean ;
isExisting? : boolean ;
nome = '';

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
vagaByEmpresa(nome:string):void{
  this.authService.getVagasByEmpresa(nome).subscribe(
    (data: any[]) => {
      this.vagas = data;
      this.isLoading = false;
    },
    error =>{
      console.error('Erro ao carregar vagas:', error);
    }

  )
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
      this.isSubmitted = true;
      this.isExisting = false;
      this.confirmedCandidatura = 'Candidatura confirmada !';
      console.log('Candidatura realizada com sucesso!'  + this.confirmedCandidatura);
      this.loadVagas();

     setTimeout(() => {
        const successElement = document.querySelector('.sucsess');
        if (successElement) {
          successElement.classList.add('hidden');
        }


        setTimeout(() => {
          this.isSubmitted = false;
        }, 1000);
      }, 2000);

    },
    error => {
      this.isExisting = true;
      this.confirmedCandidatura = 'Você já se candidatou nessa vaga !';
      console.error('Erro ao se candidatar:', error);
      this.loadVagas();

      setTimeout(() => {
      const errorElement = document.querySelector('.error');
      if (errorElement) {
        errorElement.classList.add('hidden');
    }
  setTimeout(() => {
    this.isExisting = false;
  }, 1000);
}, 2000);

}
  );
}


}
