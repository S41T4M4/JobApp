import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7083/api/v1/auth'; // URL da sua API com a versão

  constructor(private http: HttpClient) { }

  login(email: string, senha: string, perfil: string): Observable<any> {
    const loginViewModel = { email, senha, perfil };
    return this.http.post<any>(`${this.apiUrl}/login`, loginViewModel);
  }


}
