import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CardComponent } from './list/card/card.component';
import { MaterialModule } from '../material/material.module';
import { DialogComponent } from './dialog/dialog.component';
import {  ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
  {path:'', component: MenuComponent, title:'Menu'}
]



@NgModule({
  declarations: [
    MenuComponent,
    ListComponent,
    CardComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MenuComponent,
    ListComponent,
    CardComponent,
    DialogComponent
  ]
})
export class MenuModule { }
