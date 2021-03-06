import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EmpresaModel } from '../models/empresa.model';
import { PageableModel } from '../models/pageable.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  endpointAPI = environment.baseURL;

  buscarTodos(pageable?: PageableModel, cnpj?: string, nome?: string, tipoEmpresa?: string) {
    let params = new HttpParams()
      .append('page', pageable.page.toString())
      .append('size', pageable.size.toString());

    if (cnpj != null) {
      params = params.append('cnpj', cnpj);
    }

    if (nome != null) {
      params = params.append('nome', nome);
    }

    if (tipoEmpresa != null) {
      params = params.append('tipoEmpresa', tipoEmpresa);
    }

    return this.http.get<any>(`${this.endpointAPI}/empresas`, {params});
  }

  buscarMatrizes() {
    return this.http.get<EmpresaModel[]>(`${this.endpointAPI}/empresas/matrizes`);
  }

  buscarPorId(id: number) {
    return this.http.get<EmpresaModel>(`${this.endpointAPI}/empresas/${id}`);
  }

  incluir(empresa: EmpresaModel) {
    return this.http.post<EmpresaModel>(`${this.endpointAPI}/empresas`, empresa);
  }

  atualizar(id: number, empresa: EmpresaModel) {
    return this.http.put<EmpresaModel>(`${this.endpointAPI}/empresas/${id}`, empresa);
  }

  excluir(id: number) {
    return this.http.delete(`${this.endpointAPI}/empresas/${id}`);
  }
}
