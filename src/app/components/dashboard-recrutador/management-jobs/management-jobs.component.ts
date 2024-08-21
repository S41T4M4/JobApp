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
  error: Error | null = null
  vagaForm!: FormGroup;
  erro = '';
  requiredTitulo = 'O campo de titulo é obrigatorio !!'
  requiredDescription = 'O campo de descrição é obrigatorio !!';
  requiredRequisitos='O campo de requisitos é obrigatorio !!';
  requiredSalario = 'O campo de salario é obrigatorio !!';
  requiredLocal = 'O campo de local é obrigatorio !!';
  requiredStatus = 'O campo de status é obrigatorio !!'
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
      salario: [0, [Validators.required, Validators.min(0) ]],
      localizacao: ['', Validators.required],
      status: ['', Validators.required],
      id_recrutador: [this.id_recrutador]
    });
  }
  get titulo(){
    return this.vagaForm.get('titulo')!;
  }
  get descricao(){
    return this.vagaForm.get('descricao')!;
  }
  get requisitos(){
    return this.vagaForm.get('requisitos')!;
  }
  get salario(){
    return this.vagaForm.get('salario')!;
  }
  get localizacao(){
    return this.vagaForm.get('titulo')!;
  }
  get status(){
    return this.vagaForm.get('status')!;
  }

  loadVagas(): void {
    try{
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
    }catch (error){
      if(error instanceof Error){
        this.error=error;
      }
    }

  }

  addVaga(): void {

    if (this.vagaForm.valid) {
      console.log('Dados da Vaga:', this.vagaForm.value);
      this.authService.postVagas(this.vagaForm.value).subscribe(
        () => {
          this.loadVagas();
          this.vagaForm.reset();
        },
        (error) => {
          this.erro = 'Erro ao adicionar vaga : ' + error.error;
          console.error('Erro ao adicionar vaga', error);
        }
      );
    }
  }
}
