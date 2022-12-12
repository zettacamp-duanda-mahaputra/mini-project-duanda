import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuManagementComponent } from './menu-management.component';
import { RouterModule, Routes } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DialogSpecialComponent } from './dialog-special/dialog-special.component';
import { DialogDetailComponent } from './dialog-detail/dialog-detail.component'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';



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
    ReactiveFormsModule,
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
    MenuManagementComponent,
    DialogComponent,
    DialogSpecialComponent,
    DialogDetailComponent
  ]
})
export class MenuManagementModule { }
