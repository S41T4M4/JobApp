import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../auth.service';
import { Vaga } from './../../../vaga.model';

@Component({
  selector: 'app-management-jobs',
  templateUrl: './management-jobs.component.html',
  styleUrls: ['./management-jobs.component.css']
})
export class ManagementJobsComponent implements OnInit {
  vagas: Vaga[] = [];
  isLoading: boolean = true;
  id_recrutador: number = 0;
  vagaForm!: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {

    this.id_recrutador = Number(localStorage.getItem('id'));
    this.initializeForm();
    console.log(this.id_recrutador)
  }

  initializeForm(): void {
    this.vagaForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      requisitos: ['', Validators.required],
      salario: [0, [Validators.required, Validators.min(0)]],
      localizacao: ['', Validators.required],
      status: ['', Validators.required],
      id_recrutador: [this.id_recrutador]
    });
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

  addVaga(): void {
    if (this.vagaForm.valid) {
      console.log('Dados da Vaga:', this.vagaForm.value);  // Verifique o que está sendo enviado
      this.authService.postVagas(this.vagaForm.value).subscribe(
        () => {
          this.loadVagas();
          this.vagaForm.reset();
        },
        (error) => {
          console.error('Erro ao adicionar vaga', error);
        }
      );
    }
  }
}
