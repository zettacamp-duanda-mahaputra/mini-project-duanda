import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockManagementComponent } from './stock-management.component';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../material/material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



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
    FormsModule
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
