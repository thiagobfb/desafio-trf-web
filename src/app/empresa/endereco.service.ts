import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  endpointAPI = environment.baseURL;

  constructor(private http: HttpClient) { }

  buscarEndereco(cep: string) {
    return this.http.get<any>(`${this.endpointAPI}/enderecos/${cep}`);
  }

}
