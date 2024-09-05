import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Vaga } from './vaga.model';
import { Candidatura } from './candidaturas.model';
import { AplicarCandidatura } from './candidatura.model';
import { Empresa } from './empresa.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7083/api/v1';


  constructor(private http: HttpClient) { }

  login(email: string, senha: string, perfil: string, id : number, nome:string , cnpj : string, empresa_id : number): Observable<any> {
    const loginViewModel = { email, senha, perfil, id , nome, cnpj, empresa_id};
    return this.http.post<any>(`${this.apiUrl}/auth/login`, loginViewModel).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('perfil', response.perfil);
        localStorage.setItem('id', response.id);
        localStorage.setItem('nome', response.nome);
        localStorage.setItem('cnpj', response.cnpj);
        localStorage.setItem('empresa_id', response.empresa_id);


      })
    );
  }
getVagasByCnpj(cnpj: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/jobApplication/vagas/empresa`, {
        params: { cnpj: cnpj }
    });
}


 postUsuarioCandidato(nome: string,email: string, senha: string, perfil : string): Observable<any> {
  const usuarioViewModel = { email, senha, nome , perfil};
  return this.http.post<any>(`${this.apiUrl}/jobApplication/cadastro/usuarios`, usuarioViewModel);
}

postUsuarioRecrutador(email: string, nome: string, senha: string, cnpj: string): Observable<any> {
  const usuarioViewModel = { email, senha, nome, cnpj };
  return this.http.post<any>(`${this.apiUrl}/jobApplication/cadastro/recrutador`, usuarioViewModel);
}

postEmpresas(nome: string, cnpj: string):Observable<any>{
  const empresaViewModel = { nome, cnpj };
  return this.http.post<any>(`${this.apiUrl}/jobApplication/cadastro/empresas`, empresaViewModel);
}
  getCandidaturas():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/candidaturas`);
  }
  getVagasByEmpresa(nome:string):Observable<any>{

    return this.http.get<any>(`${this.apiUrl}/jobApplication/vagas/nomeEmpresa`, {
      params: { nome: nome }
    });
  }


  getVagas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/jobApplication/vagas`);
  }
  getVagasAbertas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/jobApplication/vagas/status/aberta`);
  }
  getVagasFechadas(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/jobApplication/vagas/status/fechada`);
  }
  postVagas(vaga: Vaga): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/jobApplication/vagas`, vaga);
  }
  getVagasByRecrutador(id: number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/jobApplication/vagas/${id}`);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('perfil');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getPerfil(): string | null {
    return localStorage.getItem('perfil');
  }
   deleteVagas(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/jobApplication/vagas/${id}`);
  }

  getCandidatosByRecrutador(id_recrutador : number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/jobApplication/recrutador/${id_recrutador}`);
  }
 updateStatusCandidatura(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/jobApplication/candidaturas/status/${id}`, { id, status });
  }
updateVagas(id: number, vaga: Vaga): Observable<any> {
  return this.http.put(`${this.apiUrl}/jobApplication/vagas/${id}`, vaga);
}
getCandidaturasByIdCandidato(id_candidato :number) : Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/jobApplication/candidaturasPorCandidato/${id_candidato}`);
}

postCandidatura(candidatura: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/jobApplication/candidaturas`, candidatura);
}

  deleteCandidatura(id : number) : Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/jobApplication/candidaturas/${id}`);
  }
  getCandidaturasByIdVaga(id_vaga : number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/jobApplication/candidatos/${id_vaga}`);
  }

}
