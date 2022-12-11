import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MenuComponent } from '../menu/menu.component';
import { LoginComponent } from '../login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { initializeApp } from "firebase/app";
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



initializeApp(environment.firebase);


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


const routes: Routes = [
  { path: '', component: HomepageComponent, title: 'Home' },
  { path: 'Menu', component: MenuComponent, title: 'Menu' },
  { path: 'Login', component: LoginComponent, title: 'Login' }
]


@NgModule({
  declarations: [
    HomepageComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    HttpClientModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
    FormsModule,
    ReactiveFormsModule
    
  ],
  exports: [
    HomepageComponent,
    DialogComponent
  ]
})
export class HomepageModule { }
