import { AuthService } from './../../../auth.service';
import { Vaga } from './../../../vaga.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-management-jobs',
  templateUrl: './management-jobs.component.html',
  styleUrls: ['./management-jobs.component.css']
})
export class ManagementJobsComponent implements OnInit {
  vagas: Vaga[] = [];
  isLoading: boolean = true;
  id_recrutador = 0;


  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadVagas();
  }

  loadVagas(): void {
    this.authService.getVagas().subscribe(
      (data: Vaga[]) => {
        this.vagas = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar vagas', error);
        this.isLoading = false;
      }
    );
  }
}
