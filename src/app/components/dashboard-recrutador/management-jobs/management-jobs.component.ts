import { AlertsComponent } from './../../alerts/alerts.component';
import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../auth.service';
import { Vaga } from './../../../vaga.model';
import { AlertComponent } from '@coreui/angular';
import { salaryRangeValidator } from '../../../custom-validators';

@Component({
  selector: 'app-management-jobs',
  templateUrl: './management-jobs.component.html',
  styleUrls: ['./management-jobs.component.css']
})
export class ManagementJobsComponent implements OnInit {
  @ViewChild(AlertComponent) alertComponent!: AlertsComponent;
  vagas: Vaga[] = [];
  isLoading: boolean = true;
  id_recrutador: number = 0;
  empresa_id: number = 0;
  vagaForm!: FormGroup;
  requiredTitulo = 'O campo de titulo é obrigatorio !!'
  requiredDescription = 'O campo de descrição é obrigatorio !!';
  requiredRequisitos='O campo de requisitos é obrigatorio ';
  requiredSalario = 'O salário tem que ser maior que R$500 ou menor que R$100000';
  requiredLocal = 'O campo de local é obrigatorio !!';
  requiredStatus = 'O campo de status é obrigatorio !!'
  isDisabled = false;
  formatFieldsRequired = 'É necessario preencher todos os campos'
  isSubmitted = false;
  isHidden= false;
  cnpj: string = '';
  backgroundColor = '#ffc40c';
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.id_recrutador = Number(localStorage.getItem('id'));
    this.empresa_id = Number(localStorage.getItem('empresa_id'));
    this.cnpj = String(localStorage.getItem('cnpj'));
    console.log('o cnpj da empresa é: ' + this.cnpj);
    console.log('O id da empresa é : ' + this.empresa_id);
    this.initializeForm();
    console.log(this.id_recrutador)
  }

  initializeForm(): void {
    this.vagaForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      requisitos: ['', Validators.required],
      salario: [500, [Validators.required, salaryRangeValidator(499, 100000)]],
      localizacao: ['', Validators.required],
      status: ['Aberta', Validators.required],
      id_recrutador: [this.id_recrutador],
      empresa_id:[this.empresa_id]
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
  get salario():any{
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
        console.log(error);
    }

  }

addVaga(): void {

  if (this.vagaForm.valid) {
    console.log('Dados da Vaga:', this.vagaForm.value);
    this.formatFieldsRequired = 'Vaga publicada com sucesso'
    this.backgroundColor = '#006400';
    this.authService.postVagas(this.vagaForm.value).subscribe(
      () => {
        this.loadVagas();
        // Reseta o formulário mas mantém o id_recrutador e os validadores
        this.vagaForm.reset({
          titulo: '',
          descricao: '',
          requisitos: '',
          salario: 500,
          localizacao: '',
          status: 'Aberta',
          id_recrutador: this.id_recrutador,
          empresa_id:this.empresa_id,
        });

        this.isSubmitted = false;
      },
      (error) => {
        this.formatFieldsRequired = error.error;
      }
    );
  }
}

}
