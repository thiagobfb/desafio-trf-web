import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresaFormComponent } from './empresa/empresa-form/empresa-form.component';
import { EmpresaListComponent } from './empresa/empresa-list/empresa-list.component';


const routes: Routes = [
  { path: 'empresas', component: EmpresaFormComponent },
  { path: 'empresas/:id', component: EmpresaFormComponent },
  { path: 'empresas-lista', component: EmpresaListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
