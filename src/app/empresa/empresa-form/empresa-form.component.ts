import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng';
import { EmpresaModel } from '../../models/empresa.model';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.scss']
})
export class EmpresaFormComponent implements OnInit {

  tipos: SelectItem[];
  empresa: EmpresaModel;

  constructor() { }

  ngOnInit(): void {
    this.tipos = [
      { label: 'Todos', value: '' },
      { label: 'Matriz', value: 'MATRIZ' },
      { label: 'Filial', value: 'FILIAL' },
    ];
  }

}
