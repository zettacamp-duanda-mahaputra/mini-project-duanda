import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuManagementComponent } from './menu-management.component';
import { RouterModule, Routes } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DialogSpecialComponent } from './dialog-special/dialog-special.component';
import { DialogDetailComponent } from './dialog-detail/dialog-detail.component'



const routes: Routes = [
  {path:'', component: MenuManagementComponent, title:'F&B Management'}
]



@NgModule({
  declarations: [
    MenuManagementComponent,
    DialogComponent,
    DialogSpecialComponent,
    DialogDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MenuManagementComponent,
    DialogComponent,
    DialogSpecialComponent,
    DialogDetailComponent
  ]
})
export class MenuManagementModule { }
