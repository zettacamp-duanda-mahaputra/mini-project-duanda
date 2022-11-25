import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { ListComponent } from './list/list.component';
import { CardComponent } from './list/card/card.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';



const routes: Routes = [
  {path:'', component: CartComponent, title:'Cart'}
]



@NgModule({
  declarations: [
    CartComponent,
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
    CartComponent,
    ListComponent,
    CardComponent,
    DialogComponent
  ]
})
export class CartModule { }
