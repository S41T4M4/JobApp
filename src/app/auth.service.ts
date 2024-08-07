import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Vaga } from './vaga.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7083/api/v1';


  constructor(private http: HttpClient) { }

  login(email: string, senha: string, perfil: string): Observable<any> {
    const loginViewModel = { email, senha, perfil };
    return this.http.post<any>(`${this.apiUrl}/auth/login`, loginViewModel).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('perfil', response.perfil);
      })
    );
  }

  getCandidaturas():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/candidaturas`);
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
  getVagasByRecrutador():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/jobApplication/vagas/1`);
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
    return this.http.delete<any>(`${this.apiUrl}/vagas/${id}`);
  }
    updateVagas(id: number, vaga: Vaga): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/vagas/${id}`, vaga);
  }




}
