import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng';
import { EmpresaModel } from '../../models/empresa.model';
import { EmpresaService } from '../empresa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EnderecoService } from '../endereco.service';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.scss']
})
export class EmpresaFormComponent implements OnInit {

  id: string;
  tipos: SelectItem[] = [];
  matrizes: EmpresaModel[] = [];
  empresa: EmpresaModel;
  titulo: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private empresaService: EmpresaService,
              private enderecoService: EnderecoService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.tipos = [
      { label: 'Matriz', value: 'MATRIZ' },
      { label: 'Filial', value: 'FILIAL' },
    ];

    this.id ? this.editarEmpresa() : this.preparaCadastro();
  }

  editarEmpresa() {
    this.titulo = 'Editar Empresa';
    this.empresaService.buscarPorId(Number(this.id)).subscribe(res => this.empresa = res);
  }

  buscaEndereco() {
    this.enderecoService.buscarEndereco(this.empresa.cep).subscribe(res => {
      this.empresa.complemento = res.complemento;
      this.empresa.logradouro = res.logradouro;
      this.empresa.bairro = res.bairro;
      this.empresa.cidade = res.localidade;
      this.empresa.estado = res.uf;
    });
  }

  salvarAtualizar() {
    this.empresa.cnpj = this.empresa.cnpj.replace(/\D+/g, '');
    this.empresa.cep = this.empresa.cep.replace(/\D+/g, '');
    if (this.id) {
      this.empresaService.atualizar(Number(this.id), this.empresa)
        .subscribe(res => console.log('Atualização efetuada com sucesso'));
    } else {
      this.empresaService.incluir(this.empresa)
        .subscribe(res => console.log('Cadastro efetuado com sucesso'));
    }
    this.router.navigate(['/empresas-lista']);
  }

  buscarMatrizes() {
    this.empresaService.buscarMatrizes().subscribe(res => this.matrizes = res);
  }

  private preparaCadastro() {
    this.titulo = 'Cadastro de Empresa';
    this.empresa = {
      estado: null,
      cidade: null,
      complemento: null,
      tipoEmpresa: null,
      bairro: null,
      logradouro: null,
      nome: null,
      cnpj: null,
      razaoSocial: null,
      contato: null,
      email: null,
      cep: null,
      matriz: null
    };
  }
}
