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
candidatura :Candidatura[] = [];
isLoading: boolean = true;
 constructor(private authService: AuthService) { }

 ngOnInit(){
  this.isLoading = false;
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
        this.isLoading = false;
      }
    );
  }


}
