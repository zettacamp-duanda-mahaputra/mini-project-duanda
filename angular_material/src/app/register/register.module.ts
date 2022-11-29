import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResgisterComponent } from './resgister/resgister.component';
import { RegisterComponent } from './register.component';



@NgModule({
  declarations: [
    ResgisterComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RegisterModule { }
