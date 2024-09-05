import { LocalStorageService } from '@coreui/angular';
import { AuthService } from './../../auth.service';
import { Vaga } from './../../vaga.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard-recrutador',
  templateUrl: './dashboard-recrutador.component.html',
  styleUrls: ['./dashboard-recrutador.component.css']
})
export class DashboardRecrutadorComponent implements OnInit {
  vagas: Vaga[] = [];
  error = 'O campo é obrigatorio';
  message = '';
  color = '';
  fontColor = '';
  editMode = false;
  vagaForm!: FormGroup;
  selectedVaga: Vaga | null = null;
  isLoading: boolean = true;
  tempVaga: Vaga = {
    id: 0,
    titulo: '',
    descricao: '',
    requisitos: '',
    salario: 0,
    localizacao: '',
    status: '',
    id_recrutador: 0,
    empresa : {
      id: 0,
      nome: '',
      cnpj: '',
    }
  };
    resetForm(): void {
    this.tempVaga = {
      id: 0,
      titulo: '',
      descricao: '',
      requisitos: '',
      salario: 0,
      localizacao: '',
      status: '',
      id_recrutador: 0,
      empresa:{
      id: 0,
      nome: '',
      cnpj: '',
      }

    };
    this.selectedVaga = null;
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadVagasByCnpj();
  }
loadVagasByCnpj(): void {
    let cnpj = String(localStorage.getItem('cnpj'));
    this.authService.getVagasByCnpj(cnpj).subscribe(
        (data: Vaga[]) => {
            this.vagas = data;
            this.isLoading = false;
        },
        (error: any) => {
            console.error('Não foi possível carregar as vagas: ' + error);
        }
    );
}


  loadVagas(): void {
    const recruiterId = Number(localStorage.getItem('id'));
    this.authService.getVagasByRecrutador(recruiterId).subscribe(
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

 //
  editVaga(vaga: Vaga): void {

    this.editMode = true;
    this.message='Modo edição'
    this.color = '#afeeee'
    this.fontColor = '#000000';
    this.selectedVaga = vaga;
    this.tempVaga = { ...vaga };
  }

  updateVaga(): void {
    if (this.selectedVaga) {
      this.authService.updateVagas(this.selectedVaga.id, this.tempVaga).subscribe(
        () => {
          this.editMode = false;
          this.loadVagasByCnpj();
          this.resetForm();

          },(error) => {
            if(error.status === 400){
              this.message = error.error;
              this.color = '#8b0000';
              this.fontColor = '#ffffff';
            }


          console.error('Erro ao atualizar vaga', error);
        }
      );
    }
  }


  deleteVaga(id: number): void {
    if (confirm('Tem certeza de que deseja excluir esta vaga?')) {
      this.authService.deleteVagas(id).subscribe(
        () => {
          //Retorna todas as vagas, tirando a apagada
          this.vagas = this.vagas.filter(v => v.id !== id);
          console.log('Vaga excluída com sucesso!');
        },
        (error) => {
          if(error.error = 400){
            this.editMode = true;
            this.message = 'Não é possivel excluir se existir candidatos na vaga';
            this.color = '#8b0000'
            this.fontColor ='#ffffff'
            console.log("Não é possivel excluir se existir candidatos na vaga")
          }
          else{
           console.error('Erro ao excluir vaga', error);
          }

        }
      );
    }
  }



  cancelEdit(): void {
    this.editMode = false;
    this.resetForm();
  }
}
