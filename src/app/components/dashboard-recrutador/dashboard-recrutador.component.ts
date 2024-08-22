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
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadVagas();
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

  addVaga(): void {
    this.authService.postVagas(this.tempVaga).subscribe(
      () => {
        this.loadVagas();
        this.resetForm();
      },
      (error) => {
        console.error('Erro ao adicionar vaga', error);
      }
    );
  }

  editVaga(vaga: Vaga): void {
    this.selectedVaga = vaga;
    this.tempVaga = { ...vaga };
  }

  updateVaga(): void {
    if (this.selectedVaga) {
      this.authService.updateVagas(this.selectedVaga.id, this.tempVaga).subscribe(
        () => {
          this.loadVagas(); // Recarregar a lista de vagas
          this.resetForm(); // Limpar seleção e formulário
          },(error) => {
          this.error = 'Não é possivel colocar esse salário', error;
          console.error('Erro ao atualizar vaga', error);
        }
      );
    }
  }


  deleteVaga(id: number): void {
    if (confirm('Tem certeza de que deseja excluir esta vaga?')) {
      this.authService.deleteVagas(id).subscribe(
        () => {

          this.vagas = this.vagas.filter(v => v.id !== id); // Remove a vaga da lista local
          console.log('Vaga excluída com sucesso!');
        },
        (error) => {
          console.error('Erro ao excluir vaga', error);
        }
      );
    }
  }

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
    };
    this.selectedVaga = null;
  }

  cancelEdit(): void {
    this.resetForm(); // Limpar seleção e formulário
  }
}
