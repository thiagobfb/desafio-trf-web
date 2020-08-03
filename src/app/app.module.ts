import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpresaListComponent } from './empresa/empresa-list/empresa-list.component';
import { EmpresaFormComponent } from './empresa/empresa-form/empresa-form.component';
import { ButtonModule, DialogModule, DropdownModule, InputMaskModule, InputTextModule, TableModule } from 'primeng';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    EmpresaListComponent,
    EmpresaFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    InputMaskModule,
    ButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
