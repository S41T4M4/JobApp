
import { AuthService } from '../../auth.service';
import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-dashboard-candidato',
  templateUrl: './dashboard-candidato.component.html',
  styleUrl: './dashboard-candidato.component.css',

})
export class DashboardCandidatoComponent {
  vagas: any[] = [];
  vagasFechadas : any[] = [];
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadVagas();
    this.loadVagasFechadas();
  }

  loadVagas(): void {
    this.authService.getVagasAbertas().subscribe(
      (data: any[]) => {
        this.vagas = data;
      },
      error => {
        console.error('Erro ao carregar vagas:', error);
      }
    );
  }
   loadVagasFechadas(): void {
    this.authService.getVagasFechadas().subscribe(
      (data: any[]) => {
        this.vagasFechadas = data;
      },
      error => {
        console.error('Erro ao carregar vagas:', error);
      }
    );
  }



}

