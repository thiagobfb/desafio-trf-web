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

  empresas: EmpresaModel[];
  selectedEmpresa: any;
  cols: any[];
  tipos: SelectItem[];
  selectedTipo: string;
  empresaExclusao: EmpresaModel;

  constructor(private empresaService: EmpresaService) { }

  ngOnInit() {

    this.empresaService.buscarTodos().subscribe(res => this.empresas = res);

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'nome', header: 'Nome' },
      { field: 'cnpj', header: 'CNPJ' },
      { field: 'acoes', header: 'Ações' }
    ];

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
    this.empresaService.buscarTodos(pageableData).subscribe(
      dataPaginated => {
        console.log(' pageable data:', this.empresas);
        this.empresas = dataPaginated;
      },
      error => {
        console.log('error fetching paginated data', error);
      }
    );
  }

  save() {
    this.displayDialog = false;
  }

  delete() {
    const index = this.findSelectedEmpresaIndex();
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.displayDialog = true;
  }

  findSelectedEmpresaIndex(): number {
    return this.empresas.indexOf(this.selectedEmpresa);
  }

  abrirModalExclusao(empresa: EmpresaModel) {
    this.empresaExclusao = empresa;
    this.displayDialog = true;
  }
}
