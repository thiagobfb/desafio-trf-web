export interface EmpresaModel {
  id?: number;
  cnpj: string;
  nome: string;
  tipoEmpresa: string;
  razaoSocial: string;
  contato: string;
  email: string;
  cep: string;
  estado: string;
  bairro: string;
  cidade: string;
  logradouro: string;
  complemento?: string;

  matriz?: EmpresaModel;
}
