import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockManagementComponent } from './stock-management.component';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../material/material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';



const routes: Routes = [
  {path:'', component: StockManagementComponent, title:'Stock Management'}
]



@NgModule({
  declarations: [
    StockManagementComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    StockManagementComponent,
    FormComponent
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },

]
})
export class StockManagementModule { }
