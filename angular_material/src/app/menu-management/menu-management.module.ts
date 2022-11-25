import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuManagementComponent } from './menu-management.component';
import { RouterModule, Routes } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'


const routes: Routes = [
  {path:'', component: MenuManagementComponent, title:'Menu Management'}
]



@NgModule({
  declarations: [
    MenuManagementComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MenuManagementComponent
  ]
})
export class MenuManagementModule { }
