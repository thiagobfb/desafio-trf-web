import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng';
import { EmpresaModel } from '../../models/empresa.model';
import { EmpresaService } from '../empresa.service';
import { PageableModel } from '../../models/pageable.model';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.scss']
})
export class EmpresaListComponent implements OnInit {

  displayDialog: boolean;

  empresas: EmpresaModel[] = [];
  selectedEmpresa: any;
  cnpj: string;
  nomeEmpresa: string;
  tipos: SelectItem[] = [];
  selectedTipo: string;
  empresaExclusao: EmpresaModel;
  total = 0;

  constructor(private empresaService: EmpresaService) { }

  ngOnInit() {
    this.displayDialog = false;
    this.empresaService.buscarTodos({page: 0, size: 5}).subscribe(res => this.empresas = res);

    this.tipos = [
      { label: 'Todos', value: '' },
      { label: 'Matriz', value: 'MATRIZ' },
      { label: 'Filial', value: 'FILIAL' },
    ];
  }

  loadDataLazy(event: LazyLoadEvent): void {
    const pageableData: PageableModel = {
      page: event.first / 10,
      size: event.rows
    };
    this.empresaService.buscarTodos(pageableData, this.cnpj, this.nomeEmpresa, this.selectedTipo).subscribe(
      dataPaginated => {
        // console.log(' pageable data:', this.empresas.content);
        this.empresas = dataPaginated;
        this.total = dataPaginated.totalElements;
      },
      error => {
        console.log('error fetching paginated data', error);
      }
    );
  }

  buscar() {
    const pageableData: PageableModel = {
      page: 0,
      size: 5
    };

    this.empresaService.buscarTodos(pageableData, this.cnpj, this.nomeEmpresa, this.selectedTipo).subscribe(
      dataPaginated => {
        console.log(' pageable data:', this.empresas);
        this.empresas = dataPaginated;
      },
      error => {
        console.log('error fetching paginated data', error);
      }
    );
  }

  cancelar() {
    this.displayDialog = false;
  }

  delete(id: number) {
    this.empresaService.excluir(id).subscribe(res => console.log('Deleted ' + res));
    this.displayDialog = false;
  }

  abrirModalExclusao(empresa: EmpresaModel) {
    this.empresaExclusao = empresa;
    this.displayDialog = true;
  }
}
